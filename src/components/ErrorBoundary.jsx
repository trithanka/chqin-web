import React from "react";

// Without this, one throwing section unmounts the whole tree and the page
// renders blank.
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("Unhandled render error:", error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div
        role="alert"
        className="min-h-screen w-full bg-black flex flex-col items-center justify-center px-6 text-center"
      >
        <h1 className="font-display font-black tracking-tighter text-white text-[clamp(2.5rem,7vw,72px)]">
          Chq<span className="text-green">In</span>
        </h1>
        <p className="mt-6 text-white/60 max-w-md">
          Something went wrong on our end.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-8 rounded-full bg-green text-black font-semibold text-sm px-7 py-2.5 tracking-tight transition-transform duration-300 hover:scale-[1.03]"
        >
          Reload
        </button>
      </div>
    );
  }
}
