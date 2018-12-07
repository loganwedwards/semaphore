import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
import mqtt from 'mqtt'
import styled, { css } from 'styled-components'
import { Flex, Box, Heading } from 'rebass'
import LightControlBrightness from './components/LightControlBrightness'

const ConnectionStatus = styled(Flex)`
  display: inline-flex;
  width: 1em;
  height: 1em;
  border: 1px solid ${props => props.theme.colors.grey};
  border-radius: 100%;
  background-color: ${props =>
    props.connected ? props.theme.colors.green : props.theme.colors.red};
`

const Header = styled.header``

class App extends Component {
  state = {
    connected: false,
    topics: {
      'sabbatical/cabin/mapTable/brightness': null
    }
  }

  message = (topic, message) => {
    let { topics } = this.state
    console.log(message.toString())
    topics[topic] = message.toString()
    this.setState({
      topics
    })
  }

  publish = (topic, msg) => {
    console.log(`About to publish ${msg} to ${topic}`)
    this.client.publish(topic, msg.toString(), { retain: true })
  }

  componentDidMount() {
    console.log(`Attempting to connect to ${process.env.REACT_APP_MQTT_HOST}`)
    this.client = mqtt.connect(process.env.REACT_APP_MQTT_HOST)
    const _this = this
    console.log(this.client)
    this.client.on('connect', function() {
      _this.setState({ connected: true })
      _this.client.subscribe(
        'sabbatical/cabin/mapTable/brightness',
        { retain: true },
        function(err) {
          _this.setState({ error: err })
        }
      )
    })

    // this.client.on('close')

    this.client.on('message', function(topic, message) {
      // message is Buffer
      console.log(message.toString())
      _this.message(topic, message)
      // _this.client.end()
    })
  }
  render() {
    const { topics, connected } = this.state
    return (
      <Flex
        flexDirection="column"
        bg={'darkBlue'}
        color="white"
        css={css`
          height: 90vh;
        `}
      >
        <Header>
          <Flex p={3} justifyContent="space-between" alignItems="center">
            <Flex>
              <Heading as="h1" fontSize={2}>
                Semaphore
              </Heading>
            </Flex>
            <Flex alignItems="center" justifyContent="flex-end">
              <Heading as="h3" fontSize={3}>
                Connection
              </Heading>
              <ConnectionStatus ml={2} connected={connected} />
            </Flex>
          </Flex>
        </Header>
        <main>
          <Flex justifyContent="center" mx={-2}>
            <Box px={2}>
              <LightControlBrightness
                title="Cabin Map Table"
                topic="sabbatical/cabin/mapTable/brightness"
                value={topics['sabbatical/cabin/mapTable/brightness']}
                publish={this.publish}
              />
            </Box>
          </Flex>
        </main>
      </Flex>
    )
  }
}

export default App
