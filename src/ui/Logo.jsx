import styled, { css } from 'styled-components';

const sizes = {
    round: css`
        height: 1.7rem;
        border-radius: 50%;
        border: 1px solid var(--color-darkgray);
    `,
    square: css`
        height: 3.8rem;
    `,
};

const positions = {
    start: css`
        align-self: flex-start;
    `,
    center: css`
        align-self: center;
    `,
};
const LogoWrapper = styled.div`
    ${(props) => positions[props.position]}
`;
const Img = styled.img`
    ${(props) => sizes[props.type]}
`;

function Logo({ type, url, alt, position }) {
    return (
        <LogoWrapper position={position}>
            <Img src={url} alt={alt} type={type} />
        </LogoWrapper>
    );
}

export default Logo;
