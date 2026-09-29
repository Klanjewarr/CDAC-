#pragma once
#include <filesystem>
#include <fstream>
#include <iomanip>
#include <optional>
#include <sstream>
#include <string>
#include <string_view>
#include <vector>

#include "item.hpp"

namespace inv::csv {

namespace fs = std::filesystem;

// Split one CSV line into fields, honoring "quoted, fields" and "" escapes.
inline std::vector<std::string> split_line(std::string_view line) {
    std::vector<std::string> fields;
    std::string cur;
    bool in_quotes = false;

    for (std::size_t i = 0; i < line.size(); ++i) {
        const char c = line[i];
        if (in_quotes) {
            if (c == '"') {
                if (i + 1 < line.size() && line[i + 1] == '"') {
                    cur.push_back('"');
                    ++i;
                } else {
                    in_quotes = false;
                }
            } else {
                cur.push_back(c);
            }
        } else if (c == '"') {
            in_quotes = true;
        } else if (c == ',') {
            fields.push_back(std::move(cur));
            cur.clear();
        } else {
            cur.push_back(c);
        }
    }
    fields.push_back(std::move(cur));
    return fields;
}

inline std::string escape_field(std::string_view s) {
    const bool needs_quotes = s.find_first_of(",\"\n") != std::string_view::npos;
    if (!needs_quotes) return std::string{s};

    std::string out{"\""};
    for (const char c : s) {
        if (c == '"') out += "\"\"";
        else out.push_back(c);
    }
    out.push_back('"');
    return out;
}

inline std::optional<Item> parse_item(const std::vector<std::string>& f) {
    if (f.size() != 5) return std::nullopt;
    try {
        Item it;
        it.id       = std::stoi(f[0]);
        it.name     = f[1];
        it.category = f[2];
        it.quantity = std::stoi(f[3]);
        it.price    = std::stod(f[4]);
        return it;
    } catch (...) {
        return std::nullopt;
    }
}

struct LoadResult {
    std::vector<Item> items;
    std::size_t       skipped{0};
};

inline std::optional<LoadResult> load(const fs::path& path) {
    if (!fs::exists(path)) return std::nullopt;

    std::ifstream in{path};
    if (!in) return std::nullopt;

    LoadResult result;
    std::string line;
    bool header = true;

    while (std::getline(in, line)) {
        if (!line.empty() && line.back() == '\r') line.pop_back();
        if (line.empty()) continue;
        if (header) { header = false; continue; }

        if (auto item = parse_item(split_line(line))) {
            result.items.push_back(std::move(*item));
        } else {
            ++result.skipped;
        }
    }
    return result;
}

inline bool save(const fs::path& path, const std::vector<Item>& items) {
    std::ofstream out{path};
    if (!out) return false;

    out << "id,name,category,quantity,price\n";
    out << std::fixed << std::setprecision(2);
    for (const auto& it : items) {
        out << it.id << ','
            << escape_field(it.name) << ','
            << escape_field(it.category) << ','
            << it.quantity << ','
            << it.price << '\n';
    }
    return static_cast<bool>(out);
}

} // namespace inv::csv
