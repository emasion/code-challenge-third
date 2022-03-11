import React, {useState} from 'react';
import styled from 'styled-components';
import {AnimatePresence, motion} from 'framer-motion';

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(135deg, rgb(232, 0, 255), rgb(222, 0, 238));
`;

const Grid = styled.div`
  width: 50vw;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
`;

const Box = styled(motion.div)`
  height: 200px;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 1);
`;

const overlayVariants = {
    start: {
        backgroundColor: "rgba(0,0,0,0)"
    },
    visible: {
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    exit: {
        backgroundColor: "rgba(0,0,0,0)"
    }
}

const boxVariants = {
    hover: (n: number) => {
        return {
            scale: 1.2
        }
    }
}

function App() {
    const [selectId, setSelectId] = useState<null | string>(null);
    const [pressed, setPressed] = useState<boolean>(false);
    const onClick = (n: string) => setSelectId(n);
    const onMouseDown = () => (setPressed(true));
    const onMouseUp = () => (setPressed(false));
    return (
        <Wrapper>
            <Grid>
                {[1, 2, 3, 4].map((n) =>
                    <Box
                        custom={n}
                        variants={boxVariants}
                        style={{
                            transformOrigin: `${n === 1 || n === 3 ? "100%" : "0%"} ${n === 1 || n === 2 ? "100%" : "0%"}`,
                            scale: 1
                        }}
                        whileHover="hover"
                        onClick={() => onClick(n + "")}
                        key={n}
                        layoutId={n + ""}>
                        {(n === 2 && !pressed) || (n === 3 && pressed) ? (
                            <Circle layoutId="circle"/>
                        ) : null}
                    </Box>
                )}
            </Grid>
            <AnimatePresence>{selectId ? (
                <Overlay
                    onClick={() => setSelectId(null)}
                    variants={overlayVariants}
                    initial="start"
                    animate="visible"
                    exit="exit">
                    <Box layoutId={selectId} style={{
                        width: 400,
                        height: 200,
                        backgroundColor: "rgba(255,255,255,1)"
                    }}/>
                </Overlay>
            ) : null}</AnimatePresence>
            <motion.button
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                style={{color: "blue"}}
                whileTap={{scale: 1.2, color: "orange"}}>switch
            </motion.button>
        </Wrapper>
    );
}

export default App;
