import { css } from '@emotion/react';

import { theme } from './theme';

export const globalStyles = css`
  body {
    margin: 0;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    color: ${theme.colors.primary};
    background-color: ${theme.colors.background};
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-weight: ${theme.fontWeight.semibold};
  }

  p {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    font: inherit;
    padding: 0;
  }

  /* FullCalendar стили для старых браузеров */
  .schedule-container {
    width: 100%;
    padding: 0;
    margin: 0;
    background-color: #fff;
    overflow: hidden;
  }

  .calendar-wrapper {
    overflow-x: auto;
    min-width: 1200px;
  }

  .fc-theme-standard td {
    min-width: 100px; /* Минимальная ширина ячеек */
  }

  .fc {
    border: none;
    font-size: 0.85em;
  }

  .fc-toolbar.fc-header-toolbar {
    margin-bottom: 0;
  }

  .fc-view-harness {
    border: none;
  }

  .fc-col-header-cell {
    border: none;
    background-color: hsla(0, 0%, 82%, 0.3);
    color: rgba(55, 55, 65, 1);
  }

  .fc-scrollgrid {
    border: none;
  }

  /* Фиксация заголовков и колонок */
  .fc .fc-timeline-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: white;
  }

  /* Фиксация колонки ресурсов */
  .fc .fc-resource-timeline {
    position: sticky;
    left: 0;
    z-index: 100;
    background: white;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  }

  /* Горизонтальный скролл для основной сетки */
  .fc .fc-scrollgrid-section-body {
    overflow-x: auto !important;
  }

  /* Фиксация временной шкалы */
  .fc .fc-timegrid-axis {
    position: sticky !important;
    left: 0;
    z-index: 100;
    background: white;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  }

  /* Фиксация заголовков ресурсов */
  .fc .fc-col-header-cell {
    position: sticky;
    top: 0;
    z-index: 100;
    background: white;
  }

  /* Ширина колонок */
  .fc .fc-timegrid-slots td {
    min-width: 200px !important;
  }

  /* Стили для временных меток */
  .fc-sticky-time {
    padding: 3px 6px;
    background: #f8f9fa;
    border-radius: 4px;
  }
`;
