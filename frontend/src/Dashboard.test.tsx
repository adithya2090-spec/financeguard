import { render, screen } from '@testing-library/react'
import Dashboard from '../components/Dashboard'
import '@testing-library/jest-dom'

describe('Dashboard Component', () => {
  it('renders loading state initially', () => {
    render(<Dashboard refresh={0} />)
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
  })
})
