import ColorizeIcon from '@material-ui/icons/Colorize';
import { Button, Popover } from '@nextui-org/react';
import React from 'react';
import type { ColorChangeHandler } from 'react-color';
import { ChromePicker } from 'react-color';
import { colorToString } from './colorToString';
import type { ColorPickerProps, ColorPickerState } from './types';

class ColorPicker extends React.Component<ColorPickerProps> {
  static defaultProps: Partial<ColorPickerProps> = {
    buttonContent: 'Change color',
    icon: <ColorizeIcon style={{ marginLeft: '4px', fontSize: '19px' }} />,
  };
  anchorEl: HTMLElement | null = null;

  state: ColorPickerState = {
    isColorPickerVisible: false,
  };

  handleClickShowColorPicker = () => {
    if (this.props?.onDialogOpen) {
      this.props.onDialogOpen();
    }
    this.setState({ isColorPickerVisible: !this.state.isColorPickerVisible });
  };

  onChange: ColorChangeHandler = (e) =>
    this.props.onChange && this.props.onChange(e.rgb);

  handleChangeComplete: ColorChangeHandler = (e) =>
    this.props.onChangeComplete && this.props.onChangeComplete(e.rgb);

  render() {
    return (
      <Popover
        onClose={() => {
          this.handleClickShowColorPicker();
        }}
      >
        <Popover.Trigger>
          <Button
            ref={(node) => {
              this.anchorEl = node;
            }}
            onClick={this.handleClickShowColorPicker}
            style={{
              ...this.props.style,
              borderColor: colorToString(this.props.color),
              borderStyle: 'solid',
              borderWidth: '2px',
            }}
          >
            {this.props.buttonContent}
            {this.props.icon}
          </Button>
        </Popover.Trigger>
        <Popover.Content>
          <ChromePicker
            color={this.props.color ?? undefined}
            onChange={this.onChange}
            onChangeComplete={this.handleChangeComplete}
          />
        </Popover.Content>
      </Popover>
    );
  }
}

export default ColorPicker;
