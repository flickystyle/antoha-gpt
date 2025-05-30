import styled from 'styled-components';

const Window = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin: 15px;
    border: 2px solid red;
    height: 95vh;
    border-radius: 1%;
`;

function MainWindow({ children }) {
    return <Window>{children}</Window>;
}

export default MainWindow;
