import React, { useEffect, useState } from 'react';

import { debounce } from 'lodash';

import ControlPanel, {
  Button,
  Checkbox,
  Multibox,
  Select,
  Text,
  Color,
  Range,
  Interval,
  Custom,
} from 'react-control-panel';

const applyAllLabel = 'Toggle this to apply all settings';

const SectionTitle = ({ children }) => (
  <div
    style={{
      width: '100%',
      textAlign: 'center',
      color: 'rgb(161, 161, 161)',
      textTransform: 'uppercase',
      height: '20px',
      marginBottom: '4px',
      marginTop: '8px',
    }}
  >
    {children}
  </div>
);

export default ({ params, controls, updateHandler }) => {
  const debounceTime = params ? params.debounce || 250 : 250;
  const debouncedUpdate = debounce(updateHandler, debounceTime);

  const buildControls = () => {
    return controls.map((control) => {
      switch (control.type) {
        case 'range':
          return (
            <Range
              key={control.key}
              label={control.key}
              min={control.min}
              max={control.max}
              step={control.step || 1}
            />
          );
        case 'boolean':
          return <Checkbox label={control.key} key={control.key} />;
        case 'list':
          return (
            <Select
              label={control.key}
              key={control.key}
              options={control.options}
            />
          );
        case 'header':
          return <SectionTitle>{control.title}</SectionTitle>;
        default:
          return null;
      }
    });
  };
  return (
    <div className="sketch-menu-wrapper">
      <ControlPanel
        theme="dark"
        title="Control Panel"
        initialState={{ ...params, [applyAllLabel]: true }}
        onChange={debouncedUpdate}
        width={350}
        style={{ marginRight: 30 }}
      >
        <SectionTitle>Fixed Image Seeds</SectionTitle>
        <Text label="title" />
        <Text label="pallete" />
        {controls && (
          <>
            <SectionTitle>Sketch Params</SectionTitle>
            {buildControls()}
            <SectionTitle>Reset All</SectionTitle>
            <Checkbox label={applyAllLabel} />
          </>
        )}
      </ControlPanel>
    </div>
  );
};
