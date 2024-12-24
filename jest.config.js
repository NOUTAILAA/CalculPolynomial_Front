module.exports = {
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    transformIgnorePatterns: [
      "/node_modules/(?!axios).+\\.js$"
    ],
    moduleNameMapper: {
      "\\.(css|scss|sass)$": "identity-obj-proxy"
    },
    
      testEnvironment: 'jsdom',
    };
  
  