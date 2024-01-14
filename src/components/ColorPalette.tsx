import { ColorPaletteProps } from "../types";
import './ColorPalette.css';

const ColorPalette = ({ selectedColor, onSelectColor }: ColorPaletteProps) => {
    const colors = [
        '#FF0033', '#33FF57', '#3357FF', '#FFFF33', '#FF33FF',
        '#33FFFF', '#FF5733', '#C70039', '#900C3F', '#581845',
        '#FFC300', '#DAF7A6', '#FFC0CB', '#800080', '#008080',
        '#808000', '#000080', '#DC143C'
    ];

    return (
        <div className="color-palette">
            {colors.map(color => (
                <div
                    key={color}
                    className={`color-palette-circle ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                        onSelectColor(color);
                        console.log(color)
                    }}
                />
            ))}
        </div>
    );
};

export default ColorPalette;