import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { describe, test, expect } from "vitest"
import App from "./App"

describe("Crypto Dashboard", () => {

  test("renders dashboard title", () => {
    render(<App />)

    const title = screen.getByText(/Crypto Market Dashboard/i)

    expect(title).toBeInTheDocument()
  })

  test("renders load button", () => {
    render(<App />)

    const button = screen.getByRole("button", {
      name: /load cryptocurrency data/i
    })

    expect(button).toBeInTheDocument()
  })

  test("renders cryptocurrency selector", () => {
    render(<App />)

    const select = screen.getByLabelText(/select cryptocurrency/i)

    expect(select).toBeInTheDocument()
  })

  test("renders time range selector", () => {
    render(<App />)

    const select = screen.getByLabelText(/select time range/i)

    expect(select).toBeInTheDocument()
  })

})