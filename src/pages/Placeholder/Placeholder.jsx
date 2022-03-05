import Navbar from "../../components/Navbar/Navbar"
import "./Placeholder.css"
import { Container, Image, Text } from '@mantine/core';

const placeholder = () => {
  //Placeholder page
  //everything up to date??
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
          height: "100%"
        }}
      >
        <Container>
          <Text
            className="typo"
            color="#051367"
          >
            Sitio en
          </Text>
          <Text
            className="typo brake"
            
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
        >
          <Image src="/assets/site.png" />
        </Container>
      </Container>
    </>
  )
}

export default placeholder