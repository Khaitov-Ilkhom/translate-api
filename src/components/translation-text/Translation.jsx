import { useState } from 'react';
import axios from 'axios';
import { Button, Input, Typography, Card, Select, Spin, message } from 'antd';

const { TextArea } = Input;
const { Title, Paragraph } = Typography;
const { Option } = Select;

const Translation = () => {
  const [text, setText] = useState('Hello');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('ru');

  const handleTranslate = async () => {
    setLoading(true);

    const options = {
      method: 'POST',
      url: 'https://google-translator9.p.rapidapi.com/v2',
      headers: {
        'x-rapidapi-key': '216aaa2687msh91ec62caa74c1a8p1888b2jsnd4414ee7bbf9',
        'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'text'
      }
    };

    try {
      const response = await axios.request(options);
      setTranslatedText(response.data.data.translations[0].translatedText);
    } catch (error) {
      message.error('Tarjima qilishda xato yuz berdi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8 p-4 bg-slate-300">
      <Title level={2}>Tarjima Qilish</Title>

      <div className="mb-4">
        <Select
          value={sourceLang}
          onChange={(value) => setSourceLang(value)}
          style={{ width: '48%', marginRight: '4%' }}
        >
          <Option value="en">Inglizcha</Option>
          <Option value="ru">Ruscha</Option>
          <Option value="es">Ispancha</Option>
          <Option value="fr">Fransuzcha</Option>
          <Option value="tr">Turkcha</Option>
        </Select>
        <Select
          value={targetLang}
          onChange={(value) => setTargetLang(value)}
          style={{ width: '48%' }}
        >
          <Option value="en">Inglizcha</Option>
          <Option value="ru">Ruscha</Option>
          <Option value="es">Ispancha</Option>
          <Option value="fr">Fransuzcha</Option>
          <Option value="tr">Turkcha</Option>
        </Select>
      </div>

      <TextArea
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Matnni kiriting"
        style={{ marginBottom: '16px' }}
      />

      <Button
        type="primary"
        onClick={handleTranslate}
        loading={loading}
        style={{ width: '100%' }}
      >
        Tarjima qilish
      </Button>

      {translatedText && (
        <Card
          title="Tarjima"
          style={{ marginTop: '16px' }}
        >
          <Paragraph>{translatedText}</Paragraph>
        </Card>
      )}
    </Card>
  );
};

export default Translation;