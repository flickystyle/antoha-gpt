import styled from 'styled-components';

const Window = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 5fr 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;

    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin: 15px;
    height: 95vh;
    border-radius: 1%;
`;

function MainWindow({ children }) {
    return <Window>{children}</Window>;
}

export default MainWindow;
