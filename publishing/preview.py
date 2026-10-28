"""Local-only preview with the same URL prefix and clean URLs as GitHub Pages."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit
import argparse

ROOT = Path(__file__).resolve().parent.parent / 'public'
PREFIX = '/personal_website/'


class PreviewHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if urlsplit(self.path).path == '/':
            self.send_response(302)
            self.send_header('Location', PREFIX)
            self.end_headers()
            return
        if not urlsplit(self.path).path.startswith(PREFIX):
            self.send_error(404)
            return
        super().do_GET()

    def do_HEAD(self):
        if not urlsplit(self.path).path.startswith(PREFIX):
            self.send_error(404)
            return
        super().do_HEAD()

    def translate_path(self, path):
        translated = Path(super().translate_path(path[len(PREFIX)-1:]))
        if not translated.exists() and Path(str(translated) + '.html').is_file():
            return str(Path(str(translated) + '.html'))
        return str(translated)

    def list_directory(self, path):
        self.send_error(404)
        return None

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=8885)
    args = parser.parse_args()
    if not (ROOT / 'index.html').is_file():
        parser.error('Build and validate the preview before starting the server.')
    server = ThreadingHTTPServer(('127.0.0.1', args.port), partial(PreviewHandler, directory=str(ROOT)))
    print(f'Quartz 5 preview: http://127.0.0.1:{args.port}{PREFIX}', flush=True)
    server.serve_forever()
