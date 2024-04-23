import { render, screen } from '@testing-library/react';
import AddNewCard from "DMH/components/addNewCard/AddNewCard";

describe('AddNewCard', () => {
    beforeEach(() => {
        render(<AddNewCard />);
    });
    describe('when rendering page', () => {
        it('should render the title', () => {
            const newCardTitle = screen.getByText('Agregá tu tarjeta de débito o crédito');
            expect(newCardTitle).toBeInTheDocument();
        });
    })
})
