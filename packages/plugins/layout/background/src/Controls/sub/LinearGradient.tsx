/* eslint-disable @typescript-eslint/no-explicit-any */
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Card, Text } from '@nextui-org/react';
import type { RGBColor } from '@react-page/editor';
import React from 'react';
import { ColorPicker } from '@react-page/editor';
import type { BackgroundProps } from '../../types/component';

export interface LinearGradientComponentProps {
  ensureModeOn: () => void;
  onChangeGradientDegPreview: (
    value: number | undefined,
    index: number | undefined
  ) => void;
  onChangeGradientOpacityPreview: (
    value: number | undefined,
    index: number | undefined
  ) => void;
  onChangeGradientColorPreview: (
    color: RGBColor | undefined,
    index: number | undefined,
    cIndex: number | undefined
  ) => void;
  gradientDegPreview?: number;
  gradientDegPreviewIndex?: number;
  gradientOpacityPreview?: number;
  gradientOpacityPreviewIndex?: number;
  gradientColorPreview?: RGBColor;
  gradientColorPreviewIndex?: number;
  gradientColorPreviewColorIndex?: number;
}

class LinearGradientComponent extends React.Component<
  LinearGradientComponentProps & BackgroundProps
> {
  addGradient = () => {
    this.props.ensureModeOn();
    this.props.onChange({
      gradients: (this.props.data.gradients
        ? this.props.data.gradients
        : []
      ).concat({
        deg: 45,
        opacity: 1,
      }),
    });
  };

  handleChangeDeg = (index: number, value: number) => () => {
    this.props.onChangeGradientDegPreview &&
      this.props.onChangeGradientDegPreview(undefined, undefined);
    this.props.onChange({
      gradients: (this.props.data.gradients
        ? this.props.data.gradients
        : []
      ).map((g, i) => (i === index ? { ...g, deg: value } : g)),
    });
  };

  handleChangeDegPreview = (index: number) => (e: any, value: number) => {
    this.props.onChangeGradientDegPreview &&
      this.props.onChangeGradientDegPreview(value, index);
  };

  handleChangeOpacity = (index: number, value: number) => () => {
    this.props.onChangeGradientOpacityPreview &&
      this.props.onChangeGradientOpacityPreview(undefined, undefined);
    this.props.onChange({
      gradients: (this.props.data.gradients
        ? this.props.data.gradients
        : []
      ).map((g, i) => (i === index ? { ...g, opacity: value } : g)),
    });
  };

  handleChangeOpacityPreview =
    (index: number) => (e: unknown, value: number) => {
      this.props.onChangeGradientOpacityPreview &&
        this.props.onChangeGradientOpacityPreview(value, index);
    };

  handleChangeGradientColor =
    (index: number, cpIndex: number) => (e: RGBColor) => {
      this.props.onChangeGradientColorPreview &&
        this.props.onChangeGradientColorPreview(
          undefined,
          undefined,
          undefined
        );
      this.props.onChange({
        gradients: (this.props.data.gradients ?? []).map((g, i) =>
          i === index
            ? {
                ...g,
                colors: (g.colors ? g.colors : []).map((c, cpI) =>
                  cpI === cpIndex ? { ...c, color: e } : c
                ),
              }
            : g
        ),
      });
    };

  handleChangeGradientColorPreview =
    (index: number, cpIndex: number) => (e: RGBColor) => {
      this.props.onChangeGradientColorPreview &&
        this.props.onChangeGradientColorPreview(e, index, cpIndex);
    };

  addColor = (index: number) => () => {
    this.props.ensureModeOn();
    this.props.onChange({
      gradients: this.props.data.gradients?.map((g, i) =>
        i === index
          ? {
              ...g,
              colors: [
                ...(g.colors ? g.colors : []),
                {
                  color:
                    (g.colors ? g.colors : []).length % 2 === index % 2
                      ? this.props.defaultGradientColor
                      : this.props.defaultGradientSecondaryColor,
                },
              ],
            }
          : g
      ),
    });
  };

  removeColor = (index: number, cpIndex: number) => () => {
    this.props.onChange({
      gradients: this.props.data.gradients?.map((g, i) =>
        i === index
          ? {
              ...g,
              colors: (g.colors ? g.colors : []).filter(
                (c, cpI) => cpI !== cpIndex
              ),
            }
          : g
      ),
    });
  };

  removeGradient = (index: number) => () => {
    this.props.onChange({
      gradients: this.props.data.gradients?.filter((item, i) => i !== index),
    });
  };

  render() {
    const {
      gradientDegPreview,
      gradientDegPreviewIndex,
      gradientOpacityPreview,
      gradientOpacityPreviewIndex,
      gradientColorPreview,
      gradientColorPreviewIndex,
      gradientColorPreviewColorIndex,
      data: { gradients = [] },
    } = this.props;
    return (
      <div>
        {gradients.map((gradient, i) => {
          const colors = gradient.colors ? gradient.colors : [];
          const deg =
            i === gradientDegPreviewIndex && gradientDegPreview !== undefined
              ? gradientDegPreview
              : gradient.deg;
          const opacity =
            i === gradientOpacityPreviewIndex &&
            gradientOpacityPreview !== undefined
              ? gradientOpacityPreview
              : gradient.opacity;
          return (
            <Card key={i} variant="flat">
              <Card.Header>
                <Text b>Gradient {i + 1}</Text>
              </Card.Header>
              <Card.Body>
                {/* Render the gradient sliders */}
                {/* Must use this maxWidth else when the gradient opacity slider is 100%, it goes beyond 100% and an ugly scrollbar shows */}
                <div style={{ display: 'flex', maxWidth: '96%' }}>
                  <div style={{ flex: 1 }}>
                    <Typography
                      variant="body1"
                      id="linear-gradient-degree-label"
                    >
                      {this.props.translations?.gradientRotation} ({deg}
                      {this.props.translations?.degrees})
                    </Typography>
                    <Slider
                      aria-labelledby="linear-gradient-degree-label"
                      value={deg}
                      onChange={this.handleChangeDegPreview(i) as any}
                      onChangeCommitted={this.handleChangeDeg(i, deg)}
                      step={5}
                      min={0}
                      max={360}
                    />
                  </div>

                  <div style={{ flex: 1, marginLeft: 16 }}>
                    <Typography
                      variant="body1"
                      id="linear-gradient-opacity-label"
                    >
                      {this.props.translations?.gradientOpacity} (
                      {(opacity * 100).toFixed(0)}
                      %)
                    </Typography>
                    <Slider
                      aria-labelledby="linear-gradient-opacity-label"
                      value={opacity}
                      onChange={this.handleChangeOpacityPreview(i) as any}
                      onChangeCommitted={this.handleChangeOpacity(i, opacity)}
                      step={0.01}
                      min={0}
                      max={1}
                    />
                  </div>
                </div>

                {/* Render the color pickers */}
                <div style={{ marginBottom: 32 }}>
                  {colors.map((c, cpIndex) => {
                    const color =
                      i === gradientColorPreviewIndex &&
                      cpIndex === gradientColorPreviewColorIndex &&
                      gradientColorPreview !== undefined
                        ? gradientColorPreview
                        : c.color;
                    return (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginTop: 10,
                        }}
                        key={cpIndex}
                      >
                        <ColorPicker
                          buttonContent={'Select color ' + cpIndex}
                          color={color}
                          onChange={this.handleChangeGradientColorPreview(
                            i,
                            cpIndex
                          )}
                          onChangeComplete={this.handleChangeGradientColor(
                            i,
                            cpIndex
                          )}
                        />
                        <Button
                          light
                          auto
                          color="error"
                          aria-label="Delete"
                          onClick={this.removeColor(i, cpIndex)}
                          icon={<DeleteIcon />}
                        />
                      </div>
                    );
                  })}
                </div>
                <div>
                  <Button onClick={this.addColor(i)}>
                    {this.props.translations?.addColor}
                  </Button>
                </div>
              </Card.Body>
              <Card.Footer>
                {/* Render the add new gradient button */}
                <Button
                  auto
                  color="error"
                  aria-label="Delete"
                  onClick={this.removeGradient(i)}
                  icon={<DeleteIcon />}
                >
                  Remove gradient
                </Button>
              </Card.Footer>
            </Card>
          );
        })}

        <Button
          style={{
            margin: 'auto',
            marginTop: 10,
          }}
          onClick={this.addGradient}
          disabled={gradients.length > 5}
        >
          {this.props.translations?.addGradient}
        </Button>
      </div>
    );
  }
}

export default LinearGradientComponent;
