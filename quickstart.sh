#!/bin/bash
# Quick Start Guide - Shopping Cart System

echo "================================="
echo "🛒 SHOPPING CART SYSTEM"
echo "Quick Start Guide"
echo "================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Show options
echo "Choose an option:"
echo "1) Run Tests (50+ test cases)"
echo "2) Run Examples (8 real-world scenarios)"
echo "3) Run Both"
echo "4) Open Browser Demo"
echo "5) Show Files"
echo ""

# Get user input
read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo ""
        echo "Running comprehensive test suite..."
        echo "================================="
        node test.js
        ;;
    2)
        echo ""
        echo "Running real-world examples..."
        echo "================================="
        node examples.js
        ;;
    3)
        echo ""
        echo "Running test suite..."
        echo "================================="
        node test.js
        echo ""
        echo "Running examples..."
        echo "================================="
        node examples.js
        ;;
    4)
        echo ""
        echo "Opening index.html in browser..."
        if [[ "$OSTYPE" == "darwin"* ]]; then
            open index.html
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            xdg-open index.html
        elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
            start index.html
        else
            echo "Please open index.html manually in your browser"
        fi
        ;;
    5)
        echo ""
        echo "Files in this project:"
        echo "====================="
        ls -lah
        ;;
    *)
        echo "Invalid choice!"
        exit 1
        ;;
esac

echo ""
echo "================================="
echo "Done! 🎉"
echo "================================="
