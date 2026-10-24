CLOUD AI CHAT — OPENROUTER EDITION
เว็บแชต AI ภาษาไทย สำหรับเขียนโค้ดและช่วยวางแผนทำแอป/เกม
ใช้โมเดลออนไลน์ผ่าน OpenRouter API และโฮสต์เว็บบน Vercel
ไม่ต้องรันโมเดลบนคอมของผู้ใช้

เริ่มต้น
1) สร้างบัญชี OpenRouter: https://openrouter.ai/
2) สร้าง API key ที่ https://openrouter.ai/settings/keys
3) ดูโมเดลฟรีและรหัสโมเดลปัจจุบัน: https://openrouter.ai/models?max_price=0
   โมเดลที่ตั้งต้นไว้:
   - qwen/qwen3-coder:free (เน้นโค้ด)
   - deepseek/deepseek-r1-0528:free (วิเคราะห์/ให้เหตุผล)
   - openrouter/free (เลือกโมเดลฟรีที่รองรับโดยอัตโนมัติ)
   โมเดลฟรีอาจมีโควตา/ข้อจำกัดและรายการอาจเปลี่ยนได้

ติดตั้งและโฮสต์
4) แตก ZIP แล้วอัปโหลดไฟล์ทั้งหมดไปยัง GitHub repository ใหม่
   อย่าใส่ API key ลงในไฟล์หรือ commit ลง GitHub
5) เข้า https://vercel.com/ แล้ว Import โปรเจกต์จาก GitHub
6) ใน Vercel ไปที่ Project > Settings > Environment Variables
   เพิ่ม:
   Name: OPENROUTER_API_KEY
   Value: วาง API key ที่สร้างจาก OpenRouter
   (ไม่จำเป็น) เพิ่ม OPENROUTER_MODEL เป็นรหัสโมเดลที่ต้องการ
   (ไม่จำเป็น) เพิ่ม APP_URL เป็น URL เว็บไซต์ที่ deploy แล้ว
7) กด Deploy หรือ Redeploy หลังเพิ่ม Environment Variables
8) เปิด URL ของ Vercel แล้วลองส่งข้อความ

เปลี่ยนโมเดล
- เลือกจาก dropdown บนหน้าเว็บ
- ถ้าโมเดลขึ้นว่าไม่พร้อมใช้งาน ให้เปิด https://openrouter.ai/models?max_price=0
  เลือกโมเดลที่มีป้าย Free แล้วใช้ model ID ตรงตามหน้ารายละเอียด
- API key อยู่ฝั่ง serverless function เท่านั้น ไม่ได้ฝังในหน้าเว็บ

ข้อจำกัดและความปลอดภัย
- ฟรีไม่เท่ากับไม่จำกัด: มี rate limits, อาจมีคิว หรือโมเดลฟรีอาจไม่พร้อมใช้งาน
- Vercel โฮสต์หน้าเว็บ/API proxy; การประมวลผลโมเดลทำโดยผู้ให้บริการ OpenRouter
- เว็บตัวอย่างนี้ยังไม่มีระบบสมาชิก, จำกัดการใช้งานรายคน, ฐานข้อมูลประวัติถาวร หรือระบบป้องกัน abuse
  ก่อนเปิดให้สาธารณะใช้ ควรเพิ่ม authentication, rate limiting และ logging ที่ไม่เก็บข้อมูลอ่อนไหว
- อย่าให้ API key แก่ผู้ใช้ และอย่าตั้งค่าใด ๆ ที่อนุญาตให้มีการเรียกเก็บเงินโดยไม่ตั้งใจ
- สำหรับสร้าง 3D/เกม โมเดลแชตช่วยเขียนโค้ด Blender Python, Three.js หรือ Unity ได้
  แต่ไม่ได้สร้างไฟล์ 3D โดยตรงในเว็บเวอร์ชันนี้

เอกสาร:
OpenRouter quickstart: https://openrouter.ai/docs/quickstart
Vercel: https://vercel.com/
