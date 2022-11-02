import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import type { ImageLoaded, ImageUploaded, RGBColor } from '@react-page-styled/editor';
import { Button, Grid, Input, Switch, Text } from '@nextui-org/react';

import type { BackgroundProps } from '../../types/component';
import { ColorPicker, ImageUpload } from '@react-page-styled/editor';
import { Card } from '@material-ui/core';

export interface ImageComponentProps {
  ensureModeOn: () => void;
  onImageLoaded: (image: ImageLoaded) => void;
  onImageUploaded: () => void;
  borderRadiusColorPreview?: RGBColor;
  onChangeBorderColorPreview: (color?: RGBColor) => void;
}

class ImageComponent extends React.Component<
  BackgroundProps & ImageComponentProps
> {
  handleChangeBackgroundSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange({ backgroundSize: Number(e.target.value) });
  };

  handleChangeBackground = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.ensureModeOn();
    this.props.onChange({ background: e.target.value });
  };

  handleChangeIsParallax = () => {
    this.props.ensureModeOn();
    this.props.onChange({
      isParallax:
        this.props.data.isParallax === undefined
          ? false
          : !this.props.data.isParallax,
    });
  };

  handleChangeIsBorderRadius = () => {
    this.props.ensureModeOn();
    this.props.onChange({
      isBorderRadius:
        this.props.data.isBorderRadius === undefined
          ? false
          : !this.props.data.isBorderRadius,
    });
  };

  handleImageLoaded = (image: ImageLoaded) => {
    this.props.ensureModeOn();
    this.props.onImageLoaded(image);
  };

  handleImageUploaded = (resp: ImageUploaded) => {
    this.props.onImageUploaded();
    this.props.onChange({ background: resp.url });
  };

  handleChangeBorderRadiusColor = (e?: RGBColor) =>
    this.props.onChangeBorderColorPreview &&
    this.props.onChangeBorderColorPreview(e);

  handleChangeBorderRadiusColorComplete = (e?: RGBColor) => {
    if (this.props.onChangeBorderColorPreview) {
      this.props.onChangeBorderColorPreview(undefined);
    }
    this.props.onChange({ isBorderRadius: true, borderRadiusColor: e });
  };

  handleChangeZIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange({ zIndex: Number(e.target.value) });
  };

  handleMarginTop = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange({ marginTop: e.target.value });
  };

  render() {
    const {
      data: {
        isParallax = true,
        background = '',
        isBorderRadius = false,
        borderRadiusColor = this.props.defaultBorderRadiusColor,
        backgroundSize = this.props.data.backgroundSize ||
          this.props.defaultBackgroundSize,
        zIndex = this.props.data.zIndex || this.props.defaultZIndex,
        marginTop = this.props.data.marginTop || this.props.defaultMarginTop,
      },
    } = this.props;
    return (
      <Grid.Container>
        <Grid.Container direction="row" alignItems="center">
          <Grid>
            {this.props.imageUpload && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <ImageUpload
                  translations={this.props.translations}
                  imageUpload={this.props.imageUpload}
                  imageLoaded={this.handleImageLoaded}
                  imageUploaded={this.handleImageUploaded}
                  allowedExtensions={['jpg', 'jpeg', 'png', 'gif', 'svg']}
                />
                <Text css={{ margin: '0 16px 0 16px' }}>
                  {this.props.translations?.or}
                </Text>
              </div>
            )}
          </Grid>
          <Grid>
            <Input
              placeholder={this.props.translations?.srcPlaceholder}
              style={{ width: '256px' }}
              value={background}
              onChange={this.handleChangeBackground}
            />
          </Grid>
          <Grid
            css={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Switch
              onChange={this.handleChangeIsParallax}
              checked={isParallax}
            />
            <Text
              css={{
                marginLeft: 10,
              }}
            >
              {this.props.translations?.isParallax}
            </Text>
          </Grid>
        </Grid.Container>
        <Grid.Container>
          <Grid
            css={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Switch
              onChange={this.handleChangeIsBorderRadius}
              checked={isBorderRadius}
            />
            <Text
              css={{
                marginLeft: 10,
              }}
            >
              {this.props.translations?.isBorderRadius}
            </Text>
          </Grid>
          <ColorPicker
            color={this.props.borderRadiusColorPreview ?? borderRadiusColor}
            onChange={this.handleChangeBorderRadiusColor}
            onDialogOpen={this.props.ensureModeOn}
            onChangeComplete={this.handleChangeBorderRadiusColorComplete}
            style={{ margin: 'auto' }}
          />
          <Grid.Container gap={1}>
            <Grid>
              <Input
                placeholder={this.props.translations?.backgroundSize}
                label={this.props.translations?.backgroundSize}
                type="number"
                value={backgroundSize}
                onChange={this.handleChangeBackgroundSize}
              />
            </Grid>
            <Grid>
              <Input
                placeholder={this.props.translations?.zIndex}
                label={this.props.translations?.zIndex}
                type="number"
                value={zIndex}
                onChange={this.handleChangeZIndex}
              />
            </Grid>
            <Grid>
              <Input
                placeholder={this.props.translations?.marginTop}
                label={this.props.translations?.marginTop}
                value={marginTop}
                onChange={this.handleMarginTop}
              />
            </Grid>
          </Grid.Container>
        </Grid.Container>
      </Grid.Container>
    );
  }
}

export default ImageComponent;
