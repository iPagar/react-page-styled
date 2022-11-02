import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ImageUpload, useUiTranslator } from '@react-page-styled/editor';
import React from 'react';
import type { ImageControlType } from '../types/controls';
import { Textarea, Input, Checkbox } from '@nextui-org/react';
import { Typography } from '@mui/material';

const ImageControls: ImageControlType = (props) => {
  const { t } = useUiTranslator();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Button and existing image text box */}
      <div style={{ display: 'flex', alignItems: 'end', gap: 8 }}>
        {props.imageUpload && (
          <div
            style={{
              display: 'flex',
              gap: 4,
              alignItems: 'center',
            }}
          >
            <ImageUpload
              translations={props.translations}
              imageUpload={props.imageUpload}
              imageUploaded={(image) =>
                props.onChange({
                  src: image.url,
                })
              }
            />
            <Typography variant="body1">{t(props.translations?.or)}</Typography>
          </div>
        )}
        <Input
          placeholder={t(props.translations?.srcPlaceholder) ?? ''}
          label={t(
            props.imageUpload
              ? props.translations?.haveUrl
              : props.translations?.imageUrl
          )}
          name="src"
          fullWidth
          value={props.data.src ?? ''}
          onChange={(e) =>
            props.onChange({
              src: e.target.value,
            })
          }
        />
      </div>

      <br />

      <Checkbox
        size="sm"
        isSelected={props.data.openInNewWindow ?? false}
        onChange={(isSelected) =>
          props.onChange({
            openInNewWindow: isSelected,
          })
        }
      >
        {t(props.translations?.openNewWindow)}
      </Checkbox>

      <br />
      {/* Image link textbox and checkbox */}
      <Input
        placeholder={t(props.translations?.hrefPlaceholder) ?? ''}
        label={t(props.translations?.hrefLabel) ?? ''}
        name="href"
        style={{ width: '400px' }}
        value={props.data.href ?? ''}
        onChange={(e) =>
          props.onChange({
            href: e.target.value,
          })
        }
      />

      <br />
      {/* Image's meta like alt... */}
      <Textarea
        placeholder={t(props.translations?.altPlaceholder) ?? ''}
        label={t(props.translations?.altLabel) ?? ''}
        name="alt"
        style={{ width: '400px' }}
        value={props.data.alt ?? ''}
        onChange={(e) =>
          props.onChange({
            alt: e.target.value,
          })
        }
      />
    </div>
  );
};

export default ImageControls;
