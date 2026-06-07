# Python WhatsApp Repositories for File/Message Handling

## Key Libraries

### 1. pywa
- **GitHub**: https://github.com/david-lev/pywa
- **PyPI**: https://pypi.org/project/pywa/
- **Features**:
  - Rich media messages (images, videos, documents, audio)
  - File sending with captions
  - Real-time message handling
  - Fully typed, production-ready
  - Supports FastAPI/Flask integration

### 2. whatsapp-python (filipporomani/whatsapp)
- **GitHub**: https://github.com/filipporomani/whatsapp
- **PyPI**: https://pypi.org/project/whatsapp-python/
- **Features**:
  - Async/await support
  - Media sending (images, videos, documents)
  - Message parsing and media received
  - High-load optimized

### 3. green-api/whatsapp-api-client-python
- **Docs**: https://deepwiki.com/green-api/whatsapp-api-client-python/4.2-file-and-media-messages
- **Focus**: File and media message handling

## API Approaches

### Meta WhatsApp Cloud API (Official)
- Direct integration with Facebook Graph API
- Requires Meta Business account
- Supports media uploads via `sendFile` endpoint
- Parameters: phone, filename, body (base64 or URL), caption

### BSP Providers (Easier)
- Zavu, Wassenger, 4whats.net
- Abstract away complexity
- Pre-built SDKs and documentation

## File Handling Patterns

1. **Upload then Send**: Upload file to platform, then send message reference
2. **Direct Base64**: Embed file directly in message body
3. **URL Reference**: Pass HTTP/HTTPS URL to file