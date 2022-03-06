import Navbar from "../../components/Navbar/Navbar"
import "./Placeholder.css"
import { Container, Image, Text } from '@mantine/core';

const placeholder = () => {
  return (
    <>
      <Navbar />
      <Container
        fluid
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          m="3rem 0 0 0"
        >
          <Text
            className="typo"
            color="#051367"
          >
            Sitio en
          </Text>
          <Text
            className="typo brake"
            line
            variant="gradient"
            gradient={{
              from: 'blue', to: 'cyan', deg: 45
            }}
          >
            mantenimiento
          </Text>
        </Container>
        <Container
          size={400}
          m="3rem auto"
        >
          <Image src="/assets/site.png" />
        </Container>
      </Container>
    </>
  )
}

export default placeholder