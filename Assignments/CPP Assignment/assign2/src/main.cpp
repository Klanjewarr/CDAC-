#include <filesystem>
#include <iostream>
#include <string>

#include "commands.hpp"
#include "csv.hpp"
#include "inventory.hpp"

namespace fs = std::filesystem;

namespace {

using namespace inv;

void run_command(Inventory& store, const fs::path& path,
                 const std::vector<std::string>& t, bool& running, bool& dirty) {
    const std::string& c = t[0];

    if (c == "help") {
        cmd::print_help();

    } else if (c == "list") {
        cmd::print_items(store.all());

    } else if (c == "add" && t.size() == 5) {
        auto qty   = cmd::parse_num<int>(t[3]);
        auto price = cmd::parse_num<double>(t[4]);
        if (!qty || !price) { std::cout << "Invalid qty or price.\n"; return; }
        const Item& it = store.add(t[1], t[2], *qty, *price);
        std::cout << "Added item #" << it.id << '\n';
        dirty = true;

    } else if (c == "get" && t.size() == 2) {
        auto id = cmd::parse_num<int>(t[1]);
        if (!id) { std::cout << "Invalid id.\n"; return; }
        if (const Item* it = store.find_by_id(*id)) {
            cmd::print_header();
            cmd::print_item(*it);
        } else {
            std::cout << "No item with id " << *id << '\n';
        }

    } else if (c == "find" && t.size() >= 2) {
        const std::string needle = t[1];
        cmd::print_items(store.query([&needle](const Item& it) {
            return icontains(it.name, needle) || icontains(it.category, needle);
        }));

    } else if (c == "low" && t.size() == 2) {
        auto th = cmd::parse_num<int>(t[1]);
        if (!th) { std::cout << "Invalid threshold.\n"; return; }
        cmd::print_items(store.query([th = *th](const Item& it) {
            return it.quantity < th;
        }));

    } else if (c == "category" && t.size() == 2) {
        const std::string cat = t[1];
        cmd::print_items(store.query([&cat](const Item& it) {
            return to_lower(it.category) == to_lower(cat);
        }));

    } else if (c == "price" && t.size() == 3) {
        auto lo = cmd::parse_num<double>(t[1]);
        auto hi = cmd::parse_num<double>(t[2]);
        if (!lo || !hi) { std::cout << "Invalid price range.\n"; return; }
        cmd::print_items(store.query([lo = *lo, hi = *hi](const Item& it) {
            return it.price >= lo && it.price <= hi;
        }));

    } else if (c == "set-qty" && t.size() == 3) {
        auto id  = cmd::parse_num<int>(t[1]);
        auto qty = cmd::parse_num<int>(t[2]);
        if (!id || !qty) { std::cout << "Invalid id or qty.\n"; return; }
        if (store.update(*id, [q = *qty](Item& it) { it.quantity = q; })) {
            std::cout << "Updated.\n";
            dirty = true;
        } else {
            std::cout << "No item with id " << *id << '\n';
        }

    } else if (c == "set-price" && t.size() == 3) {
        auto id = cmd::parse_num<int>(t[1]);
        auto p  = cmd::parse_num<double>(t[2]);
        if (!id || !p) { std::cout << "Invalid id or price.\n"; return; }
        if (store.update(*id, [p = *p](Item& it) { it.price = p; })) {
            std::cout << "Updated.\n";
            dirty = true;
        } else {
            std::cout << "No item with id " << *id << '\n';
        }

    } else if (c == "remove" && t.size() == 2) {
        auto id = cmd::parse_num<int>(t[1]);
        if (!id) { std::cout << "Invalid id.\n"; return; }
        if (store.remove(*id)) { std::cout << "Removed.\n"; dirty = true; }
        else std::cout << "No item with id " << *id << '\n';

    } else if (c == "value") {
        std::cout << "Total value: " << std::fixed << std::setprecision(2)
                  << store.total_value() << '\n';

    } else if (c == "save") {
        if (csv::save(path, store.snapshot())) {
            std::cout << "Saved " << store.size() << " item(s) to " << path << '\n';
            dirty = false;
        } else {
            std::cout << "Failed to write " << path << '\n';
        }

    } else if (c == "quit" || c == "exit") {
        if (dirty) {
            std::cout << "Unsaved changes. Type 'save' first, or 'quit' again to discard.\n";
            dirty = false;  // second quit exits
        } else {
            running = false;
        }

    } else {
        std::cout << "Unknown or malformed command. Type 'help'.\n";
    }
}

} // namespace

int main(int argc, char* argv[]) {
    const fs::path path = (argc > 1) ? fs::path{argv[1]} : fs::path{"inventory.csv"};

    Inventory store;
    if (auto loaded = csv::load(path)) {
        store.load_from(std::move(loaded->items));
        std::cout << "Loaded " << store.size() << " item(s) from " << path;
        if (loaded->skipped) std::cout << " (" << loaded->skipped << " bad row(s) skipped)";
        std::cout << '\n';
    } else {
        std::cout << "No file at " << path << " - starting empty.\n";
    }

    std::cout << "Type 'help' for commands.\n";

    bool running = true;
    bool dirty   = false;
    std::string line;

    while (running) {
        std::cout << "> " << std::flush;
        if (!std::getline(std::cin, line)) break;

        const auto tokens = cmd::tokenize(line);
        if (tokens.empty()) continue;

        run_command(store, path, tokens, running, dirty);
    }
    return 0;
}
