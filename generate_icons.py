#!/usr/bin/env python3
"""
Netscape Navigator-inspired Web-Safe Color icon generator for Dasai Font Social.
Features the iconic "S" (for Sans & Social) standing on the Netscape horizon!
- Deep night-sky / outer-space gradient background (#000033, #000066)
- Distant stars (#FFFFFF, #FFFF99)
- Horizon / Globe curve (#006666, #009999, #00CCCC)
- The iconic Netscape-style 3D block "S" (Sans / Social) with beveled helm touches
- Web safe beveled border (#FFFFFF, #CCCCCC, #333333, #000000)
"""
import os
import struct
import zlib
import math

def write_png(filename, width, height, pixels):
    raw_data = bytearray()
    for y in range(height):
        raw_data.append(0)  # filter type 0 (None)
        for x in range(width):
            r, g, b, a = pixels[y][x]
            raw_data.extend((r, g, b, a))

    def chunk(tag, data):
        return (
            struct.pack(">I", len(data))
            + tag
            + data
            + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)
        )

    ihdr = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    idat = zlib.compress(bytes(raw_data), 9)
    png_bytes = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr) + chunk(b"IDAT", idat) + chunk(b"IEND", b"")

    with open(filename, "wb") as f:
        f.write(png_bytes)

def generate_netscape_s_icon(size):
    # Web Safe Palette
    c_sky_dark   = (0, 0, 51, 255)       # #000033
    c_sky_blue   = (0, 0, 102, 255)      # #000066
    c_sea_dark   = (0, 51, 51, 255)      # #003333
    c_sea_mid    = (0, 102, 102, 255)    # #006666
    c_sea_light  = (0, 153, 153, 255)    # #009999
    c_sea_bright = (0, 204, 204, 255)    # #00CCCC
    c_star       = (255, 255, 153, 255)  # #FFFF99
    c_star_white = (255, 255, 255, 255)  # #FFFFFF
    c_s_body     = (255, 255, 255, 255)  # #FFFFFF
    c_s_gray     = (204, 204, 204, 255)  # #CCCCCC
    c_s_shadow   = (0, 0, 0, 255)        # #000000
    c_gold       = (255, 204, 0, 255)    # #FFCC00
    c_frame_high = (204, 204, 204, 255)  # #CCCCCC
    c_frame_low  = (51, 51, 51, 255)     # #333333

    pixels = [[c_sky_dark for _ in range(size)] for _ in range(size)]

    # 1. Background gradient (Night sky to Horizon)
    horizon_y = int(size * 0.68)
    for y in range(size):
        for x in range(size):
            if y < horizon_y:
                ratio = y / max(1, horizon_y)
                if ratio < 0.4:
                    pixels[y][x] = c_sky_dark
                else:
                    pixels[y][x] = c_sky_blue
            else:
                # Globe curve
                dx = (x - size / 2) / (size / 2)
                curve_y = horizon_y + int((dx ** 2) * (size * 0.08))
                if y == curve_y:
                    pixels[y][x] = c_sea_bright
                elif y < curve_y + max(2, size // 10):
                    pixels[y][x] = c_sea_light
                elif y < curve_y + max(4, size // 5):
                    pixels[y][x] = c_sea_mid
                else:
                    pixels[y][x] = c_sea_dark

    # 2. Add stars in the sky
    star_positions = [
        (0.16, 0.16), (0.28, 0.32), (0.80, 0.15), (0.86, 0.35),
        (0.12, 0.45), (0.74, 0.22), (0.40, 0.12), (0.64, 0.42),
        (0.88, 0.52), (0.20, 0.55)
    ]
    for sx, sy in star_positions:
        px = int(sx * size)
        py = int(sy * size)
        if 1 <= px < size - 1 and 1 <= py < horizon_y:
            pixels[py][px] = c_star_white
            if size >= 48:
                if (px + py) % 2 == 0:
                    pixels[py][px] = c_star
                if size >= 128:
                    pixels[py-1][px] = c_sky_blue
                    pixels[py+1][px] = c_sky_blue
                    pixels[py][px-1] = c_sky_blue
                    pixels[py][px+1] = c_sky_blue

    # 3. Helm / Steering wheel behind the letter
    center_x = size / 2
    center_y = size * 0.46
    radius = size * 0.34
    spoke_count = 8
    if size >= 48:
        for angle_deg in range(0, 360, 2):
            rad = math.radians(angle_deg)
            rx = int(center_x + radius * math.cos(rad))
            ry = int(center_y + radius * math.sin(rad))
            if 0 <= rx < size and 0 <= ry < size:
                pixels[ry][rx] = c_sea_mid
                if angle_deg % (360 // spoke_count) < 3:
                    for handle in range(max(2, size // 16)):
                        hx = int(center_x + (radius + handle) * math.cos(rad))
                        hy = int(center_y + (radius + handle) * math.sin(rad))
                        if 0 <= hx < size and 0 <= hy < size:
                            pixels[hy][hx] = c_gold if size >= 48 else c_sea_bright

    # 4. Draw the Netscape-style 3D block "S" (for Sans / Social)
    top_y = int(size * 0.18)
    bot_y = int(size * 0.74)
    mid_y = int((top_y + bot_y) / 2)
    left_x = int(size * 0.26)
    right_x = int(size * 0.74)
    th = max(2, int(size * 0.11))

    def is_in_s(x, y):
        if not (top_y <= y <= bot_y and left_x <= x <= right_x):
            return False

        # 1. Top horizontal bar
        if top_y <= y <= top_y + th and left_x <= x <= right_x:
            return True
        # Top-right terminal beak (pointing down)
        if top_y + th < y <= top_y + int(th * 1.8) and right_x - int(th * 0.9) <= x <= right_x:
            return True

        # 2. Upper-left vertical spine
        if top_y <= y <= mid_y + th // 2 and left_x <= x <= left_x + th:
            return True

        # 3. Middle horizontal bar
        if mid_y - th // 2 <= y <= mid_y + th // 2 and left_x <= x <= right_x:
            return True

        # 4. Lower-right vertical spine
        if mid_y - th // 2 <= y <= bot_y and right_x - th <= x <= right_x:
            return True

        # 5. Bottom horizontal bar
        if bot_y - th <= y <= bot_y and left_x <= x <= right_x:
            return True
        # Bottom-left terminal beak (pointing up)
        if bot_y - int(th * 1.8) <= y < bot_y - th and left_x <= x <= left_x + int(th * 0.9):
            return True

        return False

    # Draw 3D shadow
    sh_offset = max(1, size // 24)
    for y in range(size):
        for x in range(size):
            if is_in_s(x - sh_offset, y - sh_offset) and not is_in_s(x, y):
                pixels[y][x] = c_s_shadow

    # Draw "S" body with 3D bevel lighting
    for y in range(size):
        for x in range(size):
            if is_in_s(x, y):
                is_edge_high = not is_in_s(x - 1, y) or not is_in_s(x, y - 1)
                is_edge_low = not is_in_s(x + 1, y) or not is_in_s(x, y + 1)
                if is_edge_high:
                    pixels[y][x] = c_star_white
                elif is_edge_low and size >= 48:
                    pixels[y][x] = c_s_gray
                else:
                    pixels[y][x] = c_s_body

    # 5. Beveled window border
    b_thick = max(1, size // 32)
    for y in range(size):
        for x in range(size):
            if y < b_thick or (x < b_thick and y < size - b_thick):
                pixels[y][x] = c_frame_high
            elif y >= size - b_thick or x >= size - b_thick:
                pixels[y][x] = c_frame_low

    return pixels

def main():
    os.makedirs("icons", exist_ok=True)
    sizes = [16, 48, 128]
    for s in sizes:
        px = generate_netscape_s_icon(s)
        path = f"icons/icon-{s}.png"
        write_png(path, s, s, px)
        print(f"Generated Netscape-style 'S' icon: {path}")

if __name__ == "__main__":
    main()
