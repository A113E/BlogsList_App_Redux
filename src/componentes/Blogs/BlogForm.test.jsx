import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import configureMockStore from 'redux-mock-store'

// Crea el mockStore a partir de configureMockStore
const mockStore = configureMockStore()

describe('BlogForm.jsx', () => {})