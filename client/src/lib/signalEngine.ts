export type ScrollGeometry = {
  top: number;
  storyHeight: number;
  viewportHeight: number;
};

export type SceneDestinationInput = {
  storyTop: number;
  storyHeight: number;
  viewportHeight: number;
  sceneIndex: number;
  sceneCount: number;
};

function assertSceneCount(sceneCount: number) {
  if (!Number.isInteger(sceneCount) || sceneCount <= 0) {
    throw new RangeError("sceneCount must be a positive integer");
  }
}

export function clampProgress(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

export function getScrollProgress({
  top,
  storyHeight,
  viewportHeight,
}: ScrollGeometry) {
  const scrollableRange = Math.max(storyHeight - viewportHeight, 1);
  return clampProgress(-top / scrollableRange);
}

export function getSceneIndex(progress: number, sceneCount: number) {
  assertSceneCount(sceneCount);
  return Math.min(
    sceneCount - 1,
    Math.floor(clampProgress(progress) * sceneCount),
  );
}

export function getSceneDestination({
  storyTop,
  storyHeight,
  viewportHeight,
  sceneIndex,
  sceneCount,
}: SceneDestinationInput) {
  assertSceneCount(sceneCount);

  if (!Number.isInteger(sceneIndex) || sceneIndex < 0 || sceneIndex >= sceneCount) {
    throw new RangeError("sceneIndex must reference an existing scene");
  }

  const scrollableRange = Math.max(storyHeight - viewportHeight, 1);
  const sceneCenterProgress = (sceneIndex + 0.5) / sceneCount;

  return storyTop + scrollableRange * sceneCenterProgress;
}
