import { ThemeConfig, theme } from 'antd';

const DARK_BG_COLOR = '#191919';
const DARK_CONTAINER_COLOR = '#0E0C0C';
const FONT_FAMILY = 'Roboto';
const PRIMARY_COLOR = '#1890FF';
const HOVER_COLOR = '#121010';

interface Theme {
    dark: ThemeConfig;
    default: ThemeConfig;
}

const themes: Theme = {
    dark: {
        algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
        token: {
            colorPrimary: PRIMARY_COLOR,
            colorBgContainer: DARK_CONTAINER_COLOR,
            fontFamily: FONT_FAMILY,
            colorBgElevated: DARK_CONTAINER_COLOR
        },
        components: {
            Layout: {
                colorBgHeader: DARK_CONTAINER_COLOR
                // colorBgHeader: 'red' // colorBgBase -3% lightness, i've pre-calculated these values manually, but it'd be smart to use color.js or something like that to manage these manipulations
            },
            Menu: {
                // if you use "dark" theme on menu
                itemBorderRadius: 0,
                itemBg: DARK_CONTAINER_COLOR, // colorBgBase -3% lightness
                // colorSubItemBg: '#121A21' // colorBgBase -6% lightness,
                itemSelectedBg: HOVER_COLOR
            },
            Input: {
                colorBgContainer: 'transparent'
            },
            Button: {
                colorBgContainer: 'transparent',
                colorBgLayout: 'blue'
            },
            Table: {
                colorFillAlter: HOVER_COLOR
            },
            Select: {
                colorBgElevated: DARK_BG_COLOR,
                colorBgContainer: 'transparent',
                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px;'
            },
            DatePicker: {
                colorBgContainer: 'transparent'
            },
            Tabs: {
                colorSplit: 'transparent'
            }
        }
    },
    default: theme.defaultConfig
};

export default themes;
