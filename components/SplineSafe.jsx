"use client";

import React, { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

/**
 * Error boundary for the Spline runtime. The runtime can throw
 * synchronous deserialization errors when a scene URL points to an
 * unpublished or malformed `.splinecode` — `onError` does not catch
 * these. This boundary swallows them and renders the provided
 * `fallback` instead.
 */
class SplineErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err) {
    if (typeof window !== "undefined") {
      console.warn("[SplineSafe] runtime error suppressed:", err?.message || err);
    }
  }
  render() {
    if (this.state.hasError) return this.props.fallback || null;
    return this.props.children;
  }
}

/**
 * SplineSafe — guarded loader for a Spline runtime scene.
 *
 * Props:
 *   scene     — runtime URL ("https://prod.spline.design/<id>/scene.splinecode")
 *   fallback  — node to render if Spline fails or scene is missing
 *   loading   — node to render while suspended (defaults to a shimmer)
 *   className / style — wrapper styling
 */
export default function SplineSafe({
  scene,
  fallback = null,
  loading = null,
  className,
  style,
}) {
  if (!scene) return fallback;

  const skel = loading || (
    <div
      style={{
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(120deg, rgba(18,18,18,0.04) 0%, rgba(18,18,18,0.09) 50%, rgba(18,18,18,0.04) 100%)",
        backgroundSize: "220% 100%",
        animation: "skel-shimmer 1.6s linear infinite",
      }}
    />
  );

  return (
    <div className={className} style={{ width: "100%", height: "100%", ...style }}>
      <SplineErrorBoundary fallback={fallback}>
        <Suspense fallback={skel}>
          <Spline scene={scene} style={{ width: "100%", height: "100%" }} />
        </Suspense>
      </SplineErrorBoundary>
    </div>
  );
}
