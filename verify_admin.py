from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    # Need to grant clipboard permissions to test the copy functionality
    context = browser.new_context(permissions=['clipboard-read', 'clipboard-write'])
    page = context.new_page()
    page.goto('http://localhost:3000/admin.html')
    page.wait_for_timeout(2000)
    page.screenshot(path='/home/jules/verification/admin_page.png', full_page=True)

    # Click the "Copy Updated JSON" button
    # It might be in a header or something, let's look for a button with text "Copy Updated JSON"
    page.click("button:has-text('Copy Updated JSON')")
    page.wait_for_timeout(500)

    # Read clipboard content
    clipboard_text = page.evaluate("navigator.clipboard.readText()")
    if "hero" in clipboard_text and "projects" in clipboard_text:
        print("Clipboard copy test passed!")
    else:
        print("Clipboard copy test failed or clipboard is empty.")

    browser.close()
