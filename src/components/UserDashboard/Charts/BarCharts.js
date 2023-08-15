import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import useAuth from '../../../hooks/useAuth';

const BarCharts = () => {
    const colors = scaleOrdinal(schemeCategory10).range();
    const { user } = useAuth();
    const [myBookings, setMyBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`http://localhost:5050/booking/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setMyBookings(data)
                setLoading(false);
            })
    }, [user.email]);
    if(loading){

    }
    return (
        <div>
            <h4>Bookings</h4>
            <ResponsiveContainer width="100%" aspect={3}>
                <BarChart data={myBookings} width={500} height={300} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <XAxis dataKey="packageName" interval={'preserveStartEnd'} itemStyle={{ color: "white" }}/>
                    <YAxis />
                    <Tooltip itemStyle={{ color: "white" }} contentStyle={{ backgroundColor: "#FF8042" }} />
                    <Legend />
                    <Bar dataKey="amount" fill="#8884d8">
                        {myBookings?.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                        ))}
                    </Bar>
                    <Bar dataKey="Empty" fill="#ffc658"/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarCharts;