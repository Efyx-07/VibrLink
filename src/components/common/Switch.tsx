import { styled } from '@mui/system';
import { Switch as BaseSwitch, switchClasses } from '@mui/base/Switch';

const Switch = styled(BaseSwitch)`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 32px;
  height: 10px;
  background: #b3c3d3;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;

  & .${switchClasses.thumb} {
    display: block;
    width: 8px;
    height: 8px;
    top: 1px;
    left: 3px;
    border-radius: 16px;
    background-color: #fff;
    position: relative;
    transition: all 200ms ease;
  }

  & .${switchClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }

  &.${switchClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &.${switchClasses.checked} {
    background: #16F1E4;

    & .${switchClasses.thumb} {
      left: 20px;
      top: 1px;
      background-color: #fff;
    }
  }

  &.${switchClasses.focusVisible} .${switchClasses.thumb} {
    background-color: rgb(255 255 255 / 1);
    box-shadow: 0 0 1px 8px rgb(0 0 0 / 0.25);
  }
`;

export default function StylingSlotsSingleComponent() {
  return <Switch />;
}