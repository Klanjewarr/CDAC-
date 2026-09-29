cmake_minimum_required(VERSION 3.20)
project(inventory_manager LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

add_executable(inventory src/main.cpp)

if(MSVC)
  target_compile_options(inventory PRIVATE /W4 /permissive-)
else()
  target_compile_options(inventory PRIVATE -Wall -Wextra -Wpedantic)
endif()
