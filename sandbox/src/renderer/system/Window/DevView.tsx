import { FC, useEffect, useRef, useState, useMemo } from 'react';
import { toJS } from 'mobx';
import styled from 'styled-components';
import { lighten, darken } from 'polished';
import { devApp } from 'renderer/development';
import { useDev } from 'renderer/logic/store';
import { getInitialWindowDimensions } from 'renderer/logic/lib/window-manager';
import { observer } from 'mobx-react';

export interface WebviewProps {
  window: any;
  isResizing?: boolean;
  isDragging?: boolean;
  hasTitlebar: boolean | undefined;
}

const View = styled.div<{ hasTitleBar?: boolean }>``;

export const DevView: FC<WebviewProps> = observer((props: WebviewProps) => {
  const { window, isResizing, isDragging } = props;

  const {
    theme,
    activeWindow,
    desktopDimensions,
    setAppDimensions,
    isFullscreen,
  } = useDev();

  const webViewRef = useRef<any>(null);
  const elementRef = useRef(null);

  const webData: any = devApp.web;
  const [ready, setReady] = useState(false);
  const [cssId, setCssId] = useState(0);
  const [loading, setLoading] = useState(false);

  const onStartLoading = () => {
    setLoading(true);
  };

  const onStopLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    const webview: any = document.getElementById(`${window.id}-dev-webview`);
    webview?.addEventListener('did-start-loading', onStartLoading);
    webview?.addEventListener('did-stop-loading', onStopLoading);
    webview?.addEventListener('did-finish-load', () => {
      setReady(true);
    });

    webview?.addEventListener('close', () => {
      // @ts-ignore
      webview!.closeDevTools();
    });
    setAppDimensions(
      activeWindow.id,
      getInitialWindowDimensions(activeWindow, desktopDimensions, isFullscreen)
    );
    () => {
      setReady(false);
    };
  }, [activeWindow.id]);

  useEffect(() => {
    let css = `
      :root {
        --rlm-font: 'Rubik', sans-serif;
        --rlm-base-color: ${theme.backgroundColor};
        --rlm-accent-color: ${theme.accentColor};
        --rlm-input-color: ${theme.inputColor};
        --rlm-border-color: ${
          theme.mode === 'light'
            ? darken(0.1, theme.windowColor)
            : darken(0.075, theme.windowColor)
        };
        --rlm-window-color: ${theme.windowColor};
        --rlm-card-color: ${
          theme.mode === 'light'
            ? lighten(0.05, theme.windowColor)
            : darken(0.025, theme.windowColor)
        };
        --rlm-theme-mode: ${theme.mode};
        --rlm-text-color: ${theme.textColor};
        --rlm-icon-color: ${theme.iconColor};
      }
    `;

    if (ready) {
      const webview: any = document.getElementById(`${window.id}-dev-webview`);
      setCssId(webview!.insertCSS(css));
      webview?.addEventListener('did-frame-finish-load', () => {
        setCssId(webview!.insertCSS(css));
      });
    }
  }, [theme.mode, ready]);

  return (
    <View
      style={{
        overflowY: 'scroll',
        overflowX: 'hidden',
        width: 'inherit',
        height: 'inherit',
      }}
      ref={elementRef}
    >
      <webview
        ref={webViewRef}
        id={`${window.id}-dev-webview`}
        partition={webData.development ? 'persist:dev-webview' : 'web-webview'}
        src={webData.url}
        style={{
          background: theme.windowColor,
          width: 'inherit',
          height: '100%',
          position: 'relative',
          pointerEvents: isDragging || isResizing || loading ? 'none' : 'auto',
        }}
      />
    </View>
  );
});
