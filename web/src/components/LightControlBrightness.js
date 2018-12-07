import React, { PureComponent } from 'react'
import { Flex, Box, Button, Heading, Text } from 'rebass'
import styled from 'styled-components'
import { transparentize } from 'polished'
import { Spring } from 'react-spring'
import memoize from 'memoize-one'

const Wrapper = styled(Flex)`
  background-color: ${props => props.theme.colors.darkBlue};
`
class LightControlBrightness extends PureComponent {
  state = {
    desiredValue: 0
  }
  toggle = () => {
    const { value, topic, publish } = this.props
    const isOn = value && parseInt(value) !== 0
    const valueToPublish = isOn ? 0 : 100
    publish(topic, valueToPublish)
  }

  handleBrightnessChange = ev => {
    const { topic, publish } = this.props
    const { value } = ev.target
    // this.setState({ desiredValue: value }, () => {
    publish(topic, parseInt(value))
    // })
  }

  render() {
    const { value, title } = this.props
    const { desiredValue } = this.state

    const isOn = value && parseInt(value) !== 0
    return (
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {props => (
          <span style={props}>
            <Wrapper p={4} flexDirection="column" border>
              <Heading as="h3" textAlign="center">
                {title}
              </Heading>
              <Box>
                <Text fontSize={6} my={3} textAlign="center" style={props}>
                  {value}%
                </Text>

                {value && (
                  <input
                    type="range"
                    min="0"
                    style={{ width: '100%' }}
                    value={value}
                    max="100"
                    step="10"
                    onChange={this.handleBrightnessChange}
                  />
                )}
              </Box>
              <Flex justifyContent="center" mt={2}>
                <Button
                  variant="primary"
                  onClick={() => this.toggle()}
                >{`Turn ${isOn ? 'Off' : 'On'}`}</Button>
              </Flex>
            </Wrapper>
          </span>
        )}
      </Spring>
    )
  }
}

export default LightControlBrightness
