import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import ColorPalette from '../components/ColorPalette';

function hexToRgb(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
}

describe('ColorPalette Component', () => {
    const mockOnSelectColor = jest.fn();

    it('renders without crashing', () => {
        render(<ColorPalette selectedColor="#FFFF33" onSelectColor={mockOnSelectColor} />);
    });

    it('renders correctly', () => {
        const { asFragment } = render(<ColorPalette selectedColor="#FFFF33" onSelectColor={mockOnSelectColor} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders the correct number of color circles', () => {
        const { getAllByTestId } = render(<ColorPalette selectedColor="#FFFF33" onSelectColor={mockOnSelectColor} />);
        const colorCircles = getAllByTestId('color-palette-circle');
        expect(colorCircles.length).toBe(18);
    });

    it('indicates the selected color', () => {
        const selectedColor = "#636363";
        const rgbSelectedColor = hexToRgb(selectedColor);
        const { container } = render(<ColorPalette selectedColor={selectedColor} onSelectColor={mockOnSelectColor} />);
        const colorCircles = container.querySelectorAll('.color-palette-circle');
        // Type errors don't impact JS runtime, but HTMLElement is necessary here to avoid a VSCode error
        const selectedCircle = Array.from(colorCircles).find(circle => (circle as HTMLElement).style.backgroundColor === rgbSelectedColor);

        expect(selectedCircle).toHaveClass('selected');
    });

    it('calls onSelectColor with the correct color when a circle is clicked', () => {
        const selectedColor = "#636363";
        const rgbSelectedColor = hexToRgb(selectedColor);

        const { container } = render(<ColorPalette selectedColor="#FFFF33" onSelectColor={mockOnSelectColor} />);
        const colorCircles = container.querySelectorAll('.color-palette-circle');
        const circleToClick = Array.from(colorCircles).find(circle =>
            (circle as HTMLElement).style.backgroundColor === rgbSelectedColor
        );

        if (circleToClick) {
            fireEvent.click(circleToClick);
        }

        expect(mockOnSelectColor).toHaveBeenCalledWith(selectedColor);
    });

});
