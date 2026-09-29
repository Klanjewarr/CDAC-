#pragma once
#include <charconv>
#include <iomanip>
#include <iostream>
#include <optional>
#include <sstream>
#include <string>
#include <string_view>
#include <vector>

#include "inventory.hpp"

namespace inv::cmd {

// ---- Parsing helpers -------------------------------------------------------

inline std::vector<std::string> tokenize(std::string_view line) {
    std::vector<std::string> tokens;
    std::string cur;
    bool in_quotes = false;

    for (const char c : line) {
        if (c == '"') {
            in_quotes = !in_quotes;
        } else if (std::isspace(static_cast<unsigned char>(c)) && !in_quotes) {
            if (!cur.empty()) { tokens.push_back(std::move(cur)); cur.clear(); }
        } else {
            cur.push_back(c);
        }
    }
    if (!cur.empty()) tokens.push_back(std::move(cur));
    return tokens;
}

template <typename T>
inline std::optional<T> parse_num(std::string_view s) {
    T value{};
    const auto* first = s.data();
    const auto* last  = s.data() + s.size();
    auto [ptr, ec] = std::from_chars(first, last, value);
    if (ec != std::errc{} || ptr != last) return std::nullopt;
    return value;
}

// ---- Printing --------------------------------------------------------------

inline void print_header() {
    std::cout << std::left
              << std::setw(5)  << "ID"
              << std::setw(22) << "NAME"
              << std::setw(14) << "CATEGORY"
              << std::right
              << std::setw(6)  << "QTY"
              << std::setw(10) << "PRICE"
              << '\n'
              << std::string(57, '-') << '\n';
}

inline void print_item(const Item& it) {
    std::cout << std::left
              << std::setw(5)  << it.id
              << std::setw(22) << it.name.substr(0, 20)
              << std::setw(14) << it.category.substr(0, 12)
              << std::right
              << std::setw(6)  << it.quantity
              << std::setw(10) << std::fixed << std::setprecision(2) << it.price
              << '\n';
}

template <typename Range>
inline void print_items(const Range& items) {
    print_header();
    std::size_t n = 0;
    for (const Item* it : items) { print_item(*it); ++n; }
    std::cout << n << " item(s)\n";
}

inline void print_help() {
    std::cout <<
R"(Commands:
  list                                 show all items
  add <name> <category> <qty> <price>  add an item (quote names with spaces)
  get <id>                             show one item
  find <text>                          search name/category (case-insensitive)
  low <threshold>                      items with quantity below threshold
  category <name>                      items in a category
  price <min> <max>                    items within a price range
  set-qty <id> <qty>                   update quantity
  set-price <id> <price>               update price
  remove <id>                          delete an item
  value                                total inventory value
  save                                 write to the CSV file
  help                                 show this help
  quit                                 exit
)";
}
} // namespace inv::cmd