# 4. State Management

Date: 2019-03-11

## Status

Accepted

## Context

The state of data and UI will grow in the application as the development goes on. There needs to be good state management mechanism to handle this, particularly when components will require interaction across the component hierarchy.

## Decision

[Redux](https://redux.js.org/) will be used for state management. It is a centralised state management container that can handle data and UI state.
