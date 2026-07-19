# RAG Chunking Simulator

A lightweight, interactive web app for visualizing how documents are split into chunks for Retrieval-Augmented Generation (RAG) systems.

This project helps you understand the impact of chunk size and overlap on retrieval quality, context preservation, and chunk granularity.

## What it does

- Visualizes how a sample document is divided into chunks
- Lets you adjust chunk size and overlap with sliders
- Highlights overlapping context between consecutive chunks
- Marks chunks that end abruptly without punctuation as possible semantic breaks
- Shows the total number of generated chunks in real time

## Why this matters

In RAG pipelines, chunking is a critical design choice:

- Small chunks may lose important surrounding context
- Large chunks may introduce unnecessary noise and reduce retrieval precision
- Overlap can help preserve continuity between chunks

This simulator makes those tradeoffs easier to explore visually.

## How to use

1. Clone or download this repository.
2. Open the file [rag-chunking-simulator.html](rag-chunking-simulator.html) in your browser.
3. Adjust the sliders to see how chunking changes.

You can also serve the folder locally with a simple static server if you prefer.

## Project structure

- [rag-chunking-simulator.html](rag-chunking-simulator.html) — the main UI layout and page structure
- [script.js](script.js) — the chunking logic, rendering logic, and slider event handling

## Technologies used

- HTML
- JavaScript
- Tailwind CSS (via CDN)

## Example use case

Use this tool to demonstrate:

- how chunk size affects retrieval granularity
- how overlap improves context continuity
- how punctuation-aware chunk boundaries can influence semantic coherence

## Contribution

Feel free to fork the project, improve the visualizations, or extend it with new chunking strategies and sample documents.
