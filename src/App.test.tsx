import {render, screen} from '@testing-library/react'
import App from './App'
import '@testing-library/jest-dom';


test('renders correct elements', ()=>{
    render(<App/>);
    expect(screen.getByText('Pick your State')).toBeInTheDocument();
})