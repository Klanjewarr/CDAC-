#pragma once
#include <string>
#include <compare>

namespace inv {

struct Item {
    int         id{};
    std::string name;
    std::string category;
    int         quantity{};
    double      price{};

    auto operator<=>(const Item&) const = default;
};

} // namespace inv
