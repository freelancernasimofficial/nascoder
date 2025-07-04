#!/bin/bash

# nascoder Quick Start Script

echo "🚀 Starting nascoder Development Environment"

# Start backend server in background
echo "📡 Starting backend API server..."
cd backend && npm start &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Check if backend is running
if curl -s http://localhost:3001/health > /dev/null; then
    echo "✅ Backend API server running on http://localhost:3001"
else
    echo "❌ Backend server failed to start"
    exit 1
fi

echo ""
echo "🎉 nascoder is ready!"
echo ""
echo "📋 Quick Commands:"
echo "   nascoder auth login    # Login with freelancernasim/1234"
echo "   nascoder features      # Show available features"
echo "   nascoder models        # List AI models"
echo "   nascoder               # Start conversational session"
echo ""
echo "🔧 Development:"
echo "   Backend API: http://localhost:3001"
echo "   Health Check: http://localhost:3001/health"
echo ""
echo "Press Ctrl+C to stop all services"

# Keep script running and handle cleanup
trap "echo 'Stopping services...'; kill $BACKEND_PID; exit" INT
wait
