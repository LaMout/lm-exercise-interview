import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { PlatformInfo } from "./PlatformInfo";
import type { DeviceInfo } from "@capacitor/device";

vi.mock("@capacitor/device", () => ({
  Device: {
    getInfo: vi.fn(),
  },
}));

vi.mock("../utils/platform", () => ({
  getPlatform: vi.fn(),
  getOperatingSystem: vi.fn(),
  isMobile: vi.fn(),
  isDesktop: vi.fn(),
  isElectron: vi.fn(),
}));

vi.mock("./PlatformInfo.scss", () => ({}));

import { Device } from "@capacitor/device";
import {
  getPlatform,
  getOperatingSystem,
  isMobile,
  isDesktop,
  isElectron,
} from "../utils/platform";

const mockDevice = vi.mocked(Device);
const mockGetPlatform = vi.mocked(getPlatform);
const mockGetOperatingSystem = vi.mocked(getOperatingSystem);
const mockIsMobile = vi.mocked(isMobile);
const mockIsDesktop = vi.mocked(isDesktop);
const mockIsElectron = vi.mocked(isElectron);

describe("PlatformInfo Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly and shows platform information", async () => {
    const mockDeviceInfo: DeviceInfo = {
      name: "Test Device",
      model: "Test Model",
      webViewVersion: "1.0.0",
      platform: "web",
      operatingSystem: "unknown",
      osVersion: "1.0",
      manufacturer: "Test",
      isVirtual: false,
    };

    mockDevice.getInfo.mockResolvedValue(mockDeviceInfo);
    mockGetPlatform.mockResolvedValue("web");
    mockGetOperatingSystem.mockResolvedValue("unknown");
    mockIsMobile.mockReturnValue(false);
    mockIsDesktop.mockReturnValue(false);
    mockIsElectron.mockReturnValue(false);

    render(<PlatformInfo />);

    await waitFor(() => {
      expect(screen.getByText("Platform Information")).toBeDefined();
    });

    expect(screen.getByText("Platform: web")).toBeDefined();
    expect(screen.getByText("Device: Test Device")).toBeDefined();
    expect(screen.getByText("Model: Test Model")).toBeDefined();
    expect(screen.getByText("WebView: 1.0.0")).toBeDefined();
  });

  it("displays mobile-specific content when isMobile returns true", async () => {
    const mockDeviceInfo: DeviceInfo = {
      name: "iPhone",
      model: "iPhone 15",
      webViewVersion: "17.0",
      platform: "ios",
      operatingSystem: "ios",
      osVersion: "17.0",
      manufacturer: "Apple",
      isVirtual: false,
    };

    mockDevice.getInfo.mockResolvedValue(mockDeviceInfo);
    mockGetPlatform.mockResolvedValue("ios");
    mockGetOperatingSystem.mockResolvedValue("ios");
    mockIsMobile.mockReturnValue(true);
    mockIsDesktop.mockReturnValue(false);
    mockIsElectron.mockReturnValue(false);

    render(<PlatformInfo />);

    await waitFor(() => {
      expect(screen.getByText("Platform Information")).toBeDefined();
    });

    expect(screen.getByText("Platform: ios")).toBeDefined();
    expect(screen.getByText("Interaction: Tap to interact")).toBeDefined();
    expect(screen.getByText("Navigation: Use swipe gestures")).toBeDefined();
  });

  it("displays desktop-specific content when isElectron returns true", async () => {
    const mockDeviceInfo: DeviceInfo = {
      name: "Electron App",
      model: "Desktop",
      webViewVersion: "119.0",
      platform: "web",
      operatingSystem: "mac",
      osVersion: "14.0",
      manufacturer: "Apple",
      isVirtual: false,
    };

    mockDevice.getInfo.mockResolvedValue(mockDeviceInfo);
    mockGetPlatform.mockResolvedValue("electron");
    mockGetOperatingSystem.mockResolvedValue("mac");
    mockIsMobile.mockReturnValue(false);
    mockIsDesktop.mockReturnValue(true);
    mockIsElectron.mockReturnValue(true);

    render(<PlatformInfo />);

    await waitFor(() => {
      expect(screen.getByText("Platform Information")).toBeDefined();
    });

    expect(screen.getByText("Platform: electron")).toBeDefined();
    expect(screen.getByText("Interaction: Click to interact")).toBeDefined();
    expect(
      screen.getByText("Shortcuts: Ctrl+R to refresh, Ctrl+Q to quit")
    ).toBeDefined();
  });

  it("displays web-specific content for regular browsers", async () => {
    const mockDeviceInfo: DeviceInfo = {
      name: "Chrome Browser",
      model: "Web",
      webViewVersion: "119.0",
      platform: "web",
      operatingSystem: "unknown",
      osVersion: "1.0",
      manufacturer: "Google",
      isVirtual: false,
    };

    mockDevice.getInfo.mockResolvedValue(mockDeviceInfo);
    mockGetPlatform.mockResolvedValue("web");
    mockGetOperatingSystem.mockResolvedValue("unknown");
    mockIsMobile.mockReturnValue(false);
    mockIsDesktop.mockReturnValue(false);
    mockIsElectron.mockReturnValue(false);

    render(<PlatformInfo />);

    await waitFor(() => {
      expect(screen.getByText("Platform Information")).toBeDefined();
    });

    expect(screen.getByText("Platform: web")).toBeDefined();
    expect(
      screen.getByText("Interaction: Click or touch to interact")
    ).toBeDefined();
    expect(screen.getByText("Navigation: Use browser controls")).toBeDefined();
  });
});
