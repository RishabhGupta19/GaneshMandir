// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock Vercel packages to avoid import errors in tests
jest.mock('@vercel/analytics/react');
jest.mock('@vercel/speed-insights/react');

// Mock scrollIntoView for tests
Element.prototype.scrollIntoView = jest.fn();
