import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import ColorIcon from '@material-ui/icons/ColorLens'
import GradientIcon from '@material-ui/icons/Gradient'
import ImageIcon from '@material-ui/icons/Landscape'
import { Button, Grid, Switch, Text, Card } from '@nextui-org/react'

import React from 'react'
import type { BackgroundApi } from '../types/api'
import type { BackgroundControlsProps } from '../types/controls'
import { ModeEnum } from '../types/ModeEnum'
import ColorComponent from './sub/Color'
import ImageComponent from './sub/Image'
import LinearGradientComponent from './sub/LinearGradient'

interface BackgroundDefaultControlsState {
  mode?: ModeEnum
}

class Inner extends React.Component<
  BackgroundControlsProps & BackgroundApi,
  BackgroundDefaultControlsState
> {
  constructor(props: BackgroundControlsProps & BackgroundApi) {
    super(props)
    this.state = {
      mode: props.defaultMode,
    }
  }
  public render() {
    const {
      data: {
        hasPadding = this.props.defaultHasPadding,
        modeFlag = this.props.defaultModeFlag,
        darken = this.props.defaultDarken,
        lighten = this.props.defaultLighten,
      },
    } = this.props
    const darkenFinal =
      this.props.darkenPreview !== undefined
        ? this.props.darkenPreview
        : darken ?? 0
    const lightenFinal =
      this.props.lightenPreview !== undefined
        ? this.props.lightenPreview
        : lighten ?? 0

    return (
      <Grid.Container direction="column">
        <Grid.Container justify="center" gap={1}>
          {(this.props.enabledModes & ModeEnum.IMAGE_MODE_FLAG) > 0 && (
            <Grid>
              <Card
                variant={
                  this.state.mode === ModeEnum.IMAGE_MODE_FLAG
                    ? 'bordered'
                    : 'flat'
                }
                isHoverable
                isPressable
                onPress={() => {
                  this.handleChangeMode(ModeEnum.IMAGE_MODE_FLAG)
                }}>
                <Card.Body
                  css={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <ImageIcon
                    color={
                      modeFlag && (modeFlag & ModeEnum.IMAGE_MODE_FLAG) > 0
                        ? 'secondary'
                        : undefined
                    }
                  />
                  <Text
                    css={{
                      marginLeft: 10,
                    }}>
                    {this.props.translations?.imageMode}
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
          )}
          {(this.props.enabledModes & ModeEnum.COLOR_MODE_FLAG) > 0 && (
            <Grid>
              <Card
                variant={
                  this.state.mode === ModeEnum.COLOR_MODE_FLAG
                    ? 'bordered'
                    : 'flat'
                }
                isHoverable
                isPressable
                onPress={() => {
                  this.handleChangeMode(ModeEnum.COLOR_MODE_FLAG)
                }}>
                <Card.Body
                  css={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <ColorIcon
                    color={
                      modeFlag && (modeFlag & ModeEnum.COLOR_MODE_FLAG) > 0
                        ? 'secondary'
                        : undefined
                    }
                  />
                  <Text
                    css={{
                      marginLeft: 10,
                    }}>
                    {this.props.translations?.colorMode}
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
          )}
          {(this.props.enabledModes & ModeEnum.GRADIENT_MODE_FLAG) > 0 && (
            <Grid>
              <Card
                variant={
                  this.state.mode === ModeEnum.GRADIENT_MODE_FLAG
                    ? 'bordered'
                    : 'flat'
                }
                isHoverable
                isPressable
                onPress={() => {
                  this.handleChangeMode(ModeEnum.GRADIENT_MODE_FLAG)
                }}>
                <Card.Body
                  css={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <GradientIcon
                    color={
                      modeFlag && (modeFlag & ModeEnum.GRADIENT_MODE_FLAG) > 0
                        ? 'secondary'
                        : undefined
                    }
                  />
                  <Text
                    css={{
                      marginLeft: 10,
                    }}>
                    {this.props.translations?.gradientMode}
                  </Text>
                </Card.Body>
              </Card>
            </Grid>
          )}
        </Grid.Container>
        {/* Render one of the panels here - image / mono color / gradient */}
        <Grid>{this.renderUI()}</Grid>

        <br />

        {/* Render the common UI here for each tab - darken / lighten / padding */}
        <Grid>
          <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Typography variant="body1" id="linear-gradient-darken-label">
              {this.props.translations?.darken} (
              {(darkenFinal * 100).toFixed(0)}
              %)
            </Typography>
            <Slider
              aria-labelledby="linear-gradient-darken-label"
              value={darkenFinal}
              onChange={(e, value) =>
                this.props.handleChangeDarkenPreview(
                  value instanceof Array ? value[0] : value
                )
              }
              onChangeCommitted={this.props.handleChangeDarken}
              step={0.01}
              min={0}
              max={1}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Typography variant="body1" id="linear-gradient-lighten-label">
              {this.props.translations?.lighten} (
              {(lightenFinal * 100).toFixed(0)}
              %)
            </Typography>
            <Slider
              aria-labelledby="linear-gradient-lighten-label"
              value={lightenFinal}
              onChange={(e, value) =>
                this.props.handleChangeLightenPreview(
                  value instanceof Array ? value[0] : value
                )
              }
              onChangeCommitted={this.props.handleChangeLighten}
              step={0.01}
              min={0}
              max={1}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Switch
              onChange={this.props.handleChangeHasPadding}
              checked={hasPadding}></Switch>
            <Text
              css={{
                marginLeft: 10,
              }}>
              {this.props.translations?.usePadding}
            </Text>
          </div>
        </Grid>
      </Grid.Container>
    )
  }

  renderModeSwitch = () => {
    const {
      data: { modeFlag = this.props.defaultModeFlag },
    } = this.props

    return (
      <div
        style={{
          display: 'flex',
          marginBottom: 10,
        }}>
        <Switch
          onChange={this.props.handleChangeModeSwitch(
            this.state.mode,
            modeFlag
          )}
          checked={Boolean(
            modeFlag && this.state.mode && modeFlag & this.state.mode
          )}></Switch>
        <Text
          css={{
            marginLeft: 10,
          }}>
          {this.props.translations?.onOff}
        </Text>
      </div>
    )
  }
  renderUI = () => {
    switch (this.state.mode) {
      case ModeEnum.COLOR_MODE_FLAG:
        return (
          <>
            {/* Render the on/off switch for the panel */}
            {this.renderModeSwitch()}

            {/* Render the Background mono color controls */}
            <ColorComponent
              {...this.props}
              ensureModeOn={this.ensureModeOn(ModeEnum.COLOR_MODE_FLAG)}
              onChangeBackgroundColorPreview={
                this.props.handleChangeBackgroundColorPreview
              }
              backgroundColorPreview={this.props.backgroundColorPreview}
            />
          </>
        )

      case ModeEnum.GRADIENT_MODE_FLAG:
        return (
          <React.Fragment>
            {/* Render the on/off switch for the panel */}
            {this.renderModeSwitch()}

            {/* Render the Background gradient color controls */}
            <LinearGradientComponent
              {...this.props}
              ensureModeOn={this.ensureModeOn(ModeEnum.GRADIENT_MODE_FLAG)}
              gradientDegPreview={this.props.gradientDegPreview}
              gradientDegPreviewIndex={this.props.gradientDegPreviewIndex}
              gradientOpacityPreview={this.props.gradientOpacityPreview}
              gradientOpacityPreviewIndex={
                this.props.gradientOpacityPreviewIndex
              }
              gradientColorPreview={this.props.gradientColorPreview}
              gradientColorPreviewIndex={this.props.gradientColorPreviewIndex}
              gradientColorPreviewColorIndex={
                this.props.gradientColorPreviewColorIndex
              }
              onChangeGradientDegPreview={
                this.props.handleChangeGradientDegPreview
              }
              onChangeGradientOpacityPreview={
                this.props.handleChangeGradientOpacityPreview
              }
              onChangeGradientColorPreview={
                this.props.handleChangeGradientColorPreview
              }
            />
          </React.Fragment>
        )

      case ModeEnum.IMAGE_MODE_FLAG:
      default:
        return (
          <React.Fragment>
            {/* Render the on/off switch for the panel */}
            {this.renderModeSwitch()}

            {/* Render the Background image controls */}
            <ImageComponent
              {...this.props}
              onImageLoaded={this.props.handleImageLoaded}
              onImageUploaded={this.props.handleImageUploaded}
              ensureModeOn={this.ensureModeOn(ModeEnum.IMAGE_MODE_FLAG)}
              onChangeBorderColorPreview={this.props.onChangeBorderColorPreview}
              borderRadiusColorPreview={this.props.borderRadiusColorPreview}
            />
          </React.Fragment>
        )
    }
  }

  ensureModeOn = (mode: ModeEnum) => () => {
    const {
      data: { modeFlag = this.props.defaultModeFlag },
    } = this.props
    if (modeFlag && (modeFlag & mode) === 0) {
      this.props.handleChangeModeSwitch(mode, modeFlag)()
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChangeMode = (mode: number) => this.setState({ mode })
}

export default Inner
