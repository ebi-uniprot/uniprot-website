// Global mutable object, in order to have a flag available in different places

// reuse the same idea as React refs for the shape of the object
export const needsReload = { current: false };
