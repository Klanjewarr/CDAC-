#pragma once
#include <algorithm>
#include <concepts>
#include <memory>
#include <ranges>
#include <string>
#include <string_view>
#include <vector>

#include "item.hpp"

namespace inv {

namespace rng = std::ranges;
namespace vw  = std::views;

// ---- Concepts --------------------------------------------------------------

// Anything callable with (const Item&) that returns something bool-like.
template <typename F>
concept ItemPredicate = std::predicate<F, const Item&>;

// Anything callable with (Item&) - used for in-place updates.
template <typename F>
concept ItemMutator = std::invocable<F, Item&>;

// ---- Helpers ---------------------------------------------------------------

inline std::string to_lower(std::string_view s) {
    std::string out{s};
    rng::transform(out, out.begin(),
                   [](unsigned char c) { return static_cast<char>(std::tolower(c)); });
    return out;
}

inline bool icontains(std::string_view haystack, std::string_view needle) {
    return to_lower(haystack).find(to_lower(needle)) != std::string::npos;
}

// ---- Inventory -------------------------------------------------------------
//
// Items are owned through std::unique_ptr so each Item has a stable address
// even as the container grows/reorders (useful if you later hand out pointers).

class Inventory {
public:
    using ItemPtr = std::unique_ptr<Item>;

    Inventory() = default;

    // Move-only because of unique_ptr ownership.
    Inventory(const Inventory&)            = delete;
    Inventory& operator=(const Inventory&) = delete;
    Inventory(Inventory&&) noexcept        = default;
    Inventory& operator=(Inventory&&) noexcept = default;

    void load_from(std::vector<Item> items) {
        items_.clear();
        items_.reserve(items.size());
        for (auto& it : items) {
            next_id_ = std::max(next_id_, it.id + 1);
            items_.push_back(std::make_unique<Item>(std::move(it)));
        }
    }

    // Snapshot of items by value (for saving to CSV).
    [[nodiscard]] std::vector<Item> snapshot() const {
        std::vector<Item> out;
        out.reserve(items_.size());
        for (const auto& p : items_) out.push_back(*p);
        return out;
    }

    [[nodiscard]] std::size_t size() const noexcept { return items_.size(); }
    [[nodiscard]] bool empty() const noexcept { return items_.empty(); }

    // ---- Create ----
    Item& add(std::string name, std::string category, int quantity, double price) {
        auto p = std::make_unique<Item>(
            Item{next_id_++, std::move(name), std::move(category), quantity, price});
        Item& ref = *p;
        items_.push_back(std::move(p));
        return ref;
    }

    // ---- Read / query ----
    [[nodiscard]] Item* find_by_id(int id) const {
        auto it = rng::find_if(items_, [id](const ItemPtr& p) { return p->id == id; });
        return it == items_.end() ? nullptr : it->get();
    }

    // Lazy filtered view; nothing is copied. Valid while the inventory lives
    // and is not modified.
    template <ItemPredicate Pred>
    [[nodiscard]] auto filter(Pred pred) const {
        return items_
             | vw::transform([](const ItemPtr& p) -> const Item& { return *p; })
             | vw::filter(std::move(pred));
    }

    // Materialize a filter into a sorted vector of pointers.
    template <ItemPredicate Pred>
    [[nodiscard]] std::vector<const Item*> query(Pred pred) const {
        std::vector<const Item*> out;
        for (const Item& it : filter(std::move(pred))) out.push_back(&it);
        rng::sort(out, {}, &Item::id);
        return out;
    }

    [[nodiscard]] std::vector<const Item*> all() const {
        return query([](const Item&) { return true; });
    }

    // ---- Update ----
    template <ItemMutator Fn>
    bool update(int id, Fn&& fn) {
        if (Item* it = find_by_id(id)) {
            std::forward<Fn>(fn)(*it);
            return true;
        }
        return false;
    }

    // ---- Delete ----
    bool remove(int id) {
        const auto removed = std::erase_if(
            items_, [id](const ItemPtr& p) { return p->id == id; });
        return removed > 0;
    }

    // ---- Aggregates ----
    [[nodiscard]] double total_value() const {
        double sum = 0.0;
        for (const auto& p : items_) sum += p->quantity * p->price;
        return sum;
    }

private:
    std::vector<ItemPtr> items_;
    int next_id_{1};
};

} // namespace inv
