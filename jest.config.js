module.exports = {
	preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.js'],
	testEnvironment: 'node',
	testPathIgnorePatterns: ['/node_modules/', '/build/'],
}
