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
const LogoWrapper = styled.div``;
const Img = styled.img`
    ${(props) => sizes[props.type]}
`;

function Logo({ type, url, alt }) {
    return (
        <LogoWrapper>
            <Img src={url} alt={alt} type={type} />
        </LogoWrapper>
    );
}

export default Logo;
