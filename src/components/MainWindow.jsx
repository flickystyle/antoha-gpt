import styled from 'styled-components';

const Window = styled.div`
    display: grid;
    grid-template-rows: 1fr auto auto; 
    height: 95vh;
    gap: 5px;
    padding: 15px;
`;

function MainWindow({ children }) {
    return <Window>{children}</Window>;
}

export default MainWindow;
