import {render, screen} from '@testing-library/react';
import Footer from './Footer';
import {describe, it, expect} from 'vitest';

describe('Footer Component', () => {
  it('should render the current year in the copyright notice', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const expectedText = `© ${currentYear} MyApp Inc. All rights reserved.`;
    const footerElement = screen.getByText(expectedText);
    expect(footerElement).toBeInTheDocument();
      
    });
  });