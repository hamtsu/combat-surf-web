"use client";

import React, { useEffect, useRef } from "react";

import CalHeatmap from "cal-heatmap";
import Tooltip from "cal-heatmap/plugins/Tooltip";
import LegendLite from "cal-heatmap/plugins/LegendLite";
import CalendarLabel from "cal-heatmap/plugins/CalendarLabel";
import "cal-heatmap/cal-heatmap.css";

import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";

const ActivityHeatmap = () => {
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const cal: CalHeatmap = new CalHeatmap();
      const date = new Date();
      dayjs.extend(localeData);

      const data = [
        { date: "2024-09-01", value: 1 },
        { date: "2024-12-02", value: 6 },
        { date: "2024-12-03", value: 11 },
        { date: "2024-12-04", value: 6 },
        { date: "2024-12-05", value: 12 },
      ];

      cal.paint(
        {
          data: {
            source: data,
            x: "date",
            y: "value",
          },
          date: {
            start: date.setMonth(date.getMonth() - 5),
            Highlight: [
              new Date(date.getFullYear(), date.getMonth(), 1), // First day of the month
              new Date(date.getFullYear(), date.getMonth() + 1, 0), // Last day of the month
            ],
          },
          scale: {
            color: {
              type: "threshold",
              range: ["#14432a", "#166b34", "#37a446", "#4dd05a"],
              domain: [0, 12],
            },
          },
          range: 6,
          itemSelector: "#activity",
          domain: {
            type: "month",
            gutter: 4,
            label: { text: "MMM", textAlign: "start", position: "bottom" },
          },
          subDomain: {
            type: "ghDay",
            radius: 2,
            width: 11,
            height: 11,
            gutter: 4,
          },
        },
        [
          [
            Tooltip,
            {
              text: function (date: Date, value: number) {
                return (value ? `${value} hours` : "no playtime") + " on " + dayjs(date).format("MMM D, YYYY");
              },
            },
          ],
          [
            LegendLite,
            {
              includeBlank: true,
              itemSelector: "#legend",
              radius: 2,
              width: 11,
              height: 11,
              gutter: 4,
            },
          ],
          [
            CalendarLabel,
            {
              width: 30,
              textAlign: "start",
              text: () =>
                dayjs.weekdaysShort().map((d, i) => (i % 2 == 0 ? "" : d)),
            },
          ],
        ]
      );
    }
  }, []);
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-lg font-bold">
        Your server activity these past 6 months
      </h1>
      <div id="activity"></div>
      <div className="flex gap-2 text-[0.6rem] font-bold">
        <span>Less</span>
        <div id="legend"></div>
        <span>More hours</span>
      </div>
    </div>
  );
};

export default ActivityHeatmap;
