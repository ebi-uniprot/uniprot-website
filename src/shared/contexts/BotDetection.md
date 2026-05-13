# Bot detection logic

To then be used within the logic in order to do different behaviour depending on
what type of users we think we have. Especially targetting bots that are not
well-behaved and not announcing themselves properly by trying to pass as human.

## Types

At the moment, only the types `undetermined` (default) and `human` (assigned
when some behavioural criteria is met) exist. This could be expanded.

## Detection

A user is `undetermined` until the events tracked below determine otherwise.
Tracking is disabled and disconnected as soon as the `human` type has been
determined. A flag is set in `SessionStorage` to avoid running that logic at all
once determined and within the same session.

### Pointer events

Pointer and mouse events are used and tracked to determine if the user might be
human. It will only detect as human events that are not at position `0,0` and at
other position values that are not "too" round.

### Focus events

In order to avoid penalising keyboard users and screen-readers, focus events are
also used. The timing of any tabbing through the page is tracked in order to
determine if the user is "too robotical" based on speed and frequency of events.

## Usage

This is a value set in a global context, it can be accessed using `react`'s
`use()`.

## Caveats and things to watch out for

### Correct detection for valid human users

Always keep in mind that some users might not have standard mouse or keyboard
devices, and might browse the website using less common tools, especially
accessibility tools. Try to err in the side of caution, in case of doubt assume
it is a human accessing the page

### Crawlers and other well-behaved bots

This logic should not be used to block essential content, especially text
content, that is expected to be crawled and indexed. Monitor Google Search
Console for a few weeks after any change to this logic or to how it's used in
the codebase to make sure content is still seen correctly. These bots are
clearly announcing themselves through user-agent, and behaving correctly
according to `robots.txt` instructions. If these bots cause issues, it should be
handled through `robots.txt` changes exclusively.
